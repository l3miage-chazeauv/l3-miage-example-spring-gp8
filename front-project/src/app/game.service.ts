import { ChangeDetectorRef, EventEmitter, Injectable, OnInit } from '@angular/core';
import { Question, Reponse, MiahootGame, Parties, MiahootUser } from './QcmDefinitions';
import { Observable, firstValueFrom, map, of, switchMap, take } from 'rxjs';
import { Auth, authState, user } from '@angular/fire/auth';
import { CollectionReference, DocumentData, DocumentReference, Firestore, FirestoreDataConverter, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { APIService } from './api.service';
import { UserService } from './user.service';
import { update } from '@angular/fire/database';
import { getValueChanges } from '@angular/fire/remote-config';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from './routing.service';

const conv3: FirestoreDataConverter<any> = {
  toFirestore: val => val,
  fromFirestore: snap => ({
    questions: snap.get("questions")
  })
}

const conv2: FirestoreDataConverter<Parties> = {
  toFirestore: val => val,
  fromFirestore: snap => ({
    miahootID: snap.get("miahootID")
  })
}

const conv: FirestoreDataConverter<MiahootUser> = {
  toFirestore: val => val,
  fromFirestore: snap => ({
    miahootID: snap.get("miahootID"),
    name: snap.get("name"),
    photoUrl: snap.get("photoUrl")
  })

}

@Injectable({
  providedIn: 'root'
})

export class GameService {


  inGame: boolean = false;
  idMiahoot: number = 0;
  miahootGame: MiahootGame = { isPresented: false, miahoot: { idMiahoot: 0, listeQuestions: [] } };


  obsMiahootGame$ = new Observable<MiahootGame | undefined>;


  constructor(private auth: Auth, 
              private fs: Firestore, 
              private apiMia: APIService, 
              private ms: UserService, 
              private ar: ActivatedRoute,
              private rs: RoutingService) {
    
              }


  letsGoParty(miahootGame: MiahootGame): void { // On initialise le jeu (fonction utilisable par un présentateur/concepteur)
    miahootGame.isPresented = true;
  }

  endGame(miahootID: number): void { // On termine le jeu (fonction utilisable par un présentateur/concepteur)
    this.miahootGame.isPresented = false;

    // On inverse l'attribut inGame dans firebase
    this.inGameFalse(miahootID);

    // On delete la partie de firebase
    this.suppMiahootPresente(miahootID);
  }


  startGame(idMia : string ): void {
    this.inGameTrue(parseInt(idMia));

  }

  async inGameTrue(idMiahoot: number): Promise<void> {

    const partie = await this.getMiahootPresente(idMiahoot.toString());
    const partieData = await firstValueFrom(docData(partie));

    if (partieData) {
      partieData['inGame'] = true;
      this.inGame = true;

      await setDoc(partie, partieData);
    }

  }
  async inGameFalse(idMiahoot: number): Promise<void> {

    const partie = await this.getMiahootPresente(idMiahoot.toString());
    const partieData = await firstValueFrom(docData(partie));

    if (partieData) {
      partieData['inGame'] = false;
      this.inGame = false;
      await setDoc(partie, partieData);
    }

  }



  //Ajouter le miahoot passé en paramètre à la liste des miahoots présentés dans FB
  async addMiahootPresente(idMiahoot: number, idUserFB: string): Promise<void> {

    if (await this.verifMiahootPresente(idMiahoot) === true) { // On vérifie que le miahoot n'est pas déjà présenté
      console.log("Miahoot déjà présenté");
      return;
    }

    try {
      // On get les questions du miahoot
      const questionsMiahoot: Question[] = await this.apiMia.getAPIQuestionsByMiahootIDPr(idMiahoot);
      // console.log("questionsMiahoot : " + JSON.stringify(questionsMiahoot))

      // On instancie une partie de miahoot dans FB
      const partiesCollection = collection(this.fs, `parties/`);
      const partieData = await addDoc(partiesCollection, {
        miahootID: idMiahoot,
        idQuestionCourante: 1,
        userConnected: 0,
        inGame: false,
        questions: questionsMiahoot
      });

      this.postNbVotesAttribute(idMiahoot);

      this.addMIdToUser(partieData, idUserFB);

      this.addPresToParty(idUserFB, idMiahoot);

    } catch (error) {
      console.error("Erreur lors de l'ajout du miahoot présenté dans la base de données");
      throw error;
    }
  }

  async addMIdToUser(partieData: DocumentReference<DocumentData>, idUserFB: string): Promise<void> {
    // On ajoute l'id du miahoot à l'attribut miahootID du présentateur qui y est connecté automatiquement
    const miahootUser = await this.ms.obsMiahootUser$.pipe(take(1)).toPromise();
    // console.log("miahootUser : " + JSON.stringify(miahootUser))

    if (miahootUser) {

      const miahootUserRef = doc(this.fs, `users/${idUserFB}`).withConverter(conv);
      const miahootUserDoc = docData(miahootUserRef);
      // console.log(miahootUserDoc)

      const miahootUserData = await firstValueFrom(miahootUserDoc);
      // console.log("miahootUserData : " + JSON.stringify(miahootUserData))

      if (miahootUserData) {

        miahootUserData.miahootID = partieData.id;
        // console.log("changement val miahootID user (post): " + miahootUserData.miahootID)

        const miahootUserRef = doc(this.fs, `users/${idUserFB}`).withConverter(conv);
        await setDoc(miahootUserRef, miahootUserData);

      }
    }
  }

  async addPresToParty(idUserFB: string, idMiahoot: number): Promise<void> {
    // On ajoute l'id du présentateur à l'attribut presentateurID de la partie de miahoot
    const partie = await this.getMiahootPresente(idMiahoot.toString());
    const partieData = await firstValueFrom(docData(partie));

    if (partieData) {
      partieData['presentateurID'] = idUserFB;
      await setDoc(partie, partieData);
    }
  }

  async postIdQuestionCourante(idMiahoot: number, idQuestionCourante: number): Promise<void> {
    // On ajoute l'id de la question courante à l'attribut idQuestionCourante de la partie de miahoot
    const partie = await this.getMiahootPresente(idMiahoot.toString());
    const partieData = await firstValueFrom(docData(partie));

    if (partieData) {
      partieData['idQuestionCourante'] = idQuestionCourante;
      await updateDoc(partie, partieData);
    }

  }

  async postNbVotesAttribute(miahootID: number): Promise<void> {
    // Ajout de l'attribut nbVotes de type number aux questions d'une partie de miahoot
    // On récupère la partie de miahoot en cours de présentation
    const partie = await this.getMiahootPresente(miahootID.toString()); // On récupère la partie de miahoot
    const partieSnap = await getDoc(partie) // On récupère le snapshot de la partie de miahoot 
    let partieData = partieSnap.data(); // On récupère les données de la partie de miahoot

    if (partieSnap.exists()) {
      if (partieData !== undefined) {

        // On parcourt chaque question de la partie et on ajoute l'attribut nbVotes
        const updatedQuestions = partieData['questions'].map((question: any) => {
          const updatedResponses = question.reponses.map((reponse: any) => {
            return { ...reponse, nbVotes: 0 };
          });
          return { ...question, reponses: updatedResponses };
        });

        partieData['questions'] = updatedQuestions;
        await setDoc(partie, partieData);

      }
    }

  }

  async addVote(miahootID: number, questionIndex: number, reponseIndex: number): Promise<void> {

    //Incrémenter le nombre de votes de la réponse numéro idReponse de la question numéro idQuestion

    const partie = await this.getMiahootPresente(miahootID.toString()); // On récupère la partie de miahoot
    const partieSnap = await getDoc(partie) // On récupère le snapshot de la partie de miahoot 
    let partieData = partieSnap.data(); // On récupère les données de la partie de miahoot
    if (partieSnap.exists()) {
      if (partieData !== undefined) {

        // On parcourt chaque question de la partie et on ajoute l'attribut nbVotes
        const updatedQuestions = partieData['questions'].map((question: any, qIndex: number) => {
          if (qIndex === questionIndex) {
            const updatedResponses = question.reponses.map((reponse: any, rIndex: number) => {
              if (rIndex === reponseIndex) {
                reponse.nbVotes++;

              }
              return reponse;
            });
            return { ...question, reponses: updatedResponses };
          }
          return question;
        });

        partieData['questions'] = updatedQuestions;
        await setDoc(partie, partieData);

      }
    }
  }

  async delVote(miahootID: number, questionIndex: number, reponseIndex: number): Promise<void> {

    //Décrémenter le nombre de votes de la réponse numéro idReponse de la question numéro idQuestion

    const partie = await this.getMiahootPresente(miahootID.toString()); // On récupère la partie de miahoot
    const partieSnap = await getDoc(partie) // On récupère le snapshot de la partie de miahoot 
    let partieData = partieSnap.data(); // On récupère les données de la partie de miahoot

    if (partieSnap.exists()) {
      if (partieData !== undefined) {

        // On parcourt chaque question de la partie et on ajoute l'attribut nbVotes
        const updatedQuestions = partieData['questions'].map((question: any, qIndex: number) => {
          if (qIndex === questionIndex) {
            const updatedResponses = question.reponses.map((reponse: any, rIndex: number) => {
              if (rIndex === reponseIndex) {
                reponse.nbVotes--;

              }
              return reponse;
            });
            return { ...question, reponses: updatedResponses };
          }
          return question;
        });

        partieData['questions'] = updatedQuestions;
        await setDoc(partie, partieData);

      }
    }

  }

  async addConnectedUser(idMiahoot: number): Promise<void> {

    const partie = await this.getMiahootPresente(idMiahoot.toString());
    const partieData = await firstValueFrom(docData(partie));

    if (partieData) {
      partieData['userConnected'] = partieData['userConnected'] + 1;
      await setDoc(partie, partieData);
    }

  }

  /* GETS FIREBASE */

  async getMiahootPresente(miahootID: string): Promise<DocumentReference<DocumentData>> {
    let res = "nullId";

    const partiesCollection = collection(this.fs, `parties/`);
    const partieQuery = query(partiesCollection, where('miahootID', '==', parseInt(miahootID)));

    await getDocs(partieQuery).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        res = doc.id;
      })
    });

    const docPartie = doc(this.fs, `parties/${res}`);
    // console.log("docPartie : " + JSON.stringify(docPartie))
    // console.log("partieDOc :" + JSON.stringify(partieDoc))
    // console.log("partie Collection :" + JSON.stringify(partieDoc))
    return docPartie;
  }

  async getPresentateurMiahootPresente(miahootID: string): Promise<string> {
    let res = "nullId";

    const partiesCollection = collection(this.fs, `parties/`);
    const partieQuery = query(partiesCollection, where('miahootID', '==', parseInt(miahootID)));

    const querySnapshot = await getDocs(partieQuery);
    console.log("querySnapshot : " + JSON.stringify(querySnapshot))
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const presentateurID = docSnapshot.get('presentateurID');
      console.log("ici  : ");
      res = presentateurID;
    }

    return res;
  }

  async getDocByID(id: string): Promise<DocumentData> { // fonction useless pour l'instant
    const partiesCollection = collection(this.fs, `parties/`);

    const docRef = doc(this.fs, "partieCollection", id);

    return docRef;
  }

  // async getIdQuestionCourante(idPartie: string){
  //   const partie = doc(this.fs, `parties/${idPartie}`);
  //   const partieData = await firstValueFrom(docData(partie));
  //   return partieData['idQuestionCourante'];
  // }

  async getIdQuestionCourante(miahootID: string) {
    let res = 0;

    const partiesCollection = collection(this.fs, `parties/`);
    const partieQuery = query(partiesCollection, where('miahootID', '==', parseInt(miahootID)));

    const querySnapshot = await getDocs(partieQuery);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const idQuestionCourante = docSnapshot.get('idQuestionCourante');
      res = idQuestionCourante;
    }

    return res;
  }

  // Retoura le nombre de participant connecté durant la partie
  async getNumberOfUserConnected(idMiahoot: number): Promise<number> {
    // Initialisation du nombre d'utilisateurs connectés à 0
    let userConnected = 0;

    // Obtention de la référence à la collection "parties"
    const partiesCollection = collection(this.fs, `parties/`);

    // Création de la requête pour récupérer les documents ayant l'id Miahoot correspondant
    const partieQuery = query(partiesCollection, where('miahootID', '==', idMiahoot));
    const querySnapshot = await getDocs(partieQuery);

    if (!querySnapshot.empty) {
      // Récupération du premier document trouvé
      const docSnapshot = querySnapshot.docs[0];

      // Récupération de la valeur de la propriété 'userConnected' dans le document
      userConnected = docSnapshot.get('userConnected');
    }

    // Retour du nombre d'utilisateurs connectés
    return userConnected;
  }

  /* DELETES FIREBASE */

  async suppConnectedUser(idMiahoot: number): Promise<void> {

    const partie = await this.getMiahootPresente(idMiahoot.toString());
    const partieData = await firstValueFrom(docData(partie));

    if (partieData) {
      partieData['userConnected'] = partieData['userConnected'] - 1;
      await setDoc(partie, partieData);
    }



  }

  async suppMiahootPresente(idMiahoot: number): Promise<void> {
    // supprime le miahoot d'id idMiahoot de firebase
    const partie = await this.getMiahootPresente(idMiahoot.toString());
    const partieData = await firstValueFrom(docData(partie));

    if (partieData) {
      console.log("suppression du miahoot");
      await deleteDoc(partie);
    }

  }

  /* AUTRES FONCTIONS FIREBASE */

  async verifMiahootPresente(idMiahoot: number): Promise<boolean> { // vérifie si le miahoot d'id idMiahoot existe dans firebase

    const partiesCollection = collection(this.fs, `parties/`);
    const partieQuery = query(partiesCollection, where('miahootID', '==', idMiahoot));
    const partieDoc = await getDocs(partieQuery);

    if (partieDoc.size > 0 && partieDoc.docs[0].exists()) {
      return true;
    } else {
      return false;
    }
  }

  async compteVotes(idMiahoot: number, idQuestion: number): Promise<number[]> {
    // compte le nombre de votes pour chaque réponse d'une question donnée
    const partiesCollection = collection(this.fs, `parties/`);
    const partieQuery = query(partiesCollection, where('miahootID', '==', idMiahoot));
    const partieDoc = await getDocs(partieQuery);

    let res: number[] = [];

    if (partieDoc.size > 0 && partieDoc.docs[0].exists()) {
      const docSnapshot = partieDoc.docs[0];
      const questions = docSnapshot.get('questions');
      const question = questions[idQuestion];
      const reponses = question.reponses;

      for (let i = 0; i < reponses.length; i++) {
        const reponse = reponses[i];
        res.push(reponse.nbVotes);
      }
    }

    return res;
  }

  /* FCT SETUP OBSERVABLE FIREBASE */

  setObsPartie(miahootID: string): Observable<any> {
    const partie = collection(this.fs, `parties/`);
    const partieQuery = query(partie, where('miahootID', '==', parseInt(miahootID)));

    const partieObs = collectionData(partieQuery, { idField: 'id' });
    return partieObs;
  }

}