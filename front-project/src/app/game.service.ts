import { Injectable } from '@angular/core';
import { Question, Reponse, MiahootGame, Parties, MiahootUser } from './QcmDefinitions';
import { Observable, firstValueFrom, map, of, switchMap, take } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, FirestoreDataConverter, addDoc, collection, collectionData, doc, docData, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { APIService } from './api.service';
import { MiahootService } from './miahoot.service';

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
  miahootGame: MiahootGame = { isPresented: false, miahoot: { idMiahoot: 0, listeQuestions: [] } };

  obsMiahootGame$ = new Observable<MiahootGame | undefined>;

  obsParties$: Observable<Parties | undefined> = of();

  constructor(private auth: Auth, private fs: Firestore, private apiMia: APIService, private ms: MiahootService) {

    this.obsParties$ = authState(this.auth).pipe(
      switchMap((user) => {
        if (user) {
          const partiesRef = collection(this.fs, `parties/`).withConverter(conv2)
          return collectionData(partiesRef).pipe(
            map((querySnapshot) => {
              // console.log("querySnapshot : " + JSON.stringify(querySnapshot))
              return querySnapshot[0]
            })
          );
        } else {
          return of(undefined)
        }
      })
    )


  }

  letsGoParty(miahootGame: MiahootGame): void { // On initialise le jeu (fonction utilisable par un présentateur/concepteur)
    miahootGame.isPresented = true;
  }

  startGame(): void {
    this.inGame = true;
  }

  //Ajouter le miahoot passé en paramètre à la liste des miahoots présentés dans FB
  async addMiahootPresente(idMiahoot: number, idUserFB: string): Promise<void> {

    if(await this.verifMiahootPresente(idMiahoot) === true){ // On vérifie que le miahoot n'est pas déjà présenté
      console.log("Miahoot déjà présenté")
      return;
    }

    try {
      // On get les questions du miahoot
      const questionsMiahoot: Question[] = await this.apiMia.getAPIQuestionsByMiahootIDPr(idMiahoot);
      // console.log("questionsMiahoot : " + JSON.stringify(questionsMiahoot))

      // On instancie une partie de miahoot dans FB
      const partiesCollection = collection(this.fs, `parties/`);
      const partieData = await addDoc(partiesCollection, {
        miahootID: idMiahoot
      });
      // console.log("PartieData : " + JSON.stringify(PartieData))

      const questionsCollection = collection(this.fs, `parties/${partieData.id}/questions`);
      const questiondata = await addDoc(questionsCollection, {
        questions: questionsMiahoot
      });
      // console.log("Questiondata : " + JSON.stringify(Questiondata))

      this.addMIdToUser(partieData, idUserFB);

    } catch (error) {
      console.error("Erreur lors de l'ajout du miahoot présenté dans la base de données");
      throw error;
    }
  }

  async addMIdToUser(partieData: DocumentReference<DocumentData>, idUserFB: string): Promise<void> {
    // On ajoute l'id du miahoot à l'attribut miahootID du présentateur qui y est connecté automatiquement
    const miahootUser = await this.ms.obsMiahootUser$.pipe(take(1)).toPromise();
    console.log("miahootUser : " + JSON.stringify(miahootUser))

    if (miahootUser) {

      const miahootUserRef = doc(this.fs, `users/${idUserFB}`).withConverter(conv);
      const miahootUserDoc = docData(miahootUserRef);
      console.log(miahootUserDoc)
      const miahootUserData = await firstValueFrom(miahootUserDoc);
      console.log("miahootUserData : " + JSON.stringify(miahootUserData))

      if (miahootUserData) {

        miahootUserData.miahootID = partieData.id;
        console.log("changement val miahootID user (post): " + miahootUserData.miahootID)
        const miahootUserRef = doc(this.fs, `users/${idUserFB}`).withConverter(conv);
        await setDoc(miahootUserRef, miahootUserData);

      }
    }
  }

  async getMiahootPresente(miahootID: number): Promise<DocumentReference<DocumentData>> {
    let res = "nullId";

    const partiesCollection = collection(this.fs, `parties/`);
    const partieQuery = query(partiesCollection, where('miahootID', '==', miahootID));

    const partieDoc = await getDocs(partieQuery).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        res = doc.id;
      })
    });

    const docPartie = doc(this.fs, `parties/${res}`);
    return docPartie;
  }

  async getDocByID(id: string): Promise<DocumentData> { // fonction useless pour l'instant
    const partiesCollection = collection(this.fs, `parties/`);

    const docRef = doc(this.fs, "partieCollection", id);

    return docRef;
  }

  async verifMiahootPresente(idMiahoot: number): Promise<boolean> { // vérifie si le miahoot d'id idMiahoot existe dans firebase

    const partiesCollection = collection(this.fs, `parties/`);
    const partieQuery = query(partiesCollection, where('miahootID', '==', idMiahoot));

    if (partieQuery) {
      return true;
    } else {
      return false;
    }
  }

}
