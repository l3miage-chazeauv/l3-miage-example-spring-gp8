import { Injectable } from '@angular/core';
import { Question, Reponse, MiahootGame, Parties } from './QcmDefinitions';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, FirestoreDataConverter, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { APIService } from './api.service';

const conv2 : FirestoreDataConverter<Parties> = {
  toFirestore : val => val,
  fromFirestore : snap => ({
    miahootID : snap.get("miahootID")
  })
}

@Injectable({
  providedIn: 'root'
})

export class GameService{

  
  inGame: boolean = false;
  miahootGame: MiahootGame = {isPresented: false, miahoot: {idMiahoot: 0, listeQuestions: []}};

  obsMiahootGame$ = new Observable<MiahootGame | undefined>;
  
  obsParties$ : Observable<Parties|undefined> = of();

  constructor(private auth: Auth, private fs : Firestore, private apiMia: APIService) {

    this.obsParties$ = authState(this.auth).pipe(
      switchMap( (user) => {
        if(user){
          const partiesRef = collection(this.fs , `parties/`).withConverter(conv2)
          return collectionData(partiesRef).pipe(
            map((querySnapshot) => {
              console.log("querySnapshot : " + JSON.stringify(querySnapshot))
              return querySnapshot[0]
            })
          );
        } else{
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
  addMiahootPresente(idMiahoot: number): void {
    // On get les questions du miahoot
    this.apiMia.getAPIQuestionsByMiahootID(idMiahoot).subscribe((questions) => {
      const questionsMiahoot: Question[] = questions;


      this.obsParties$.pipe(
        take(1),
        map(async idMiahoot => {
          if (idMiahoot) {
            const PartiesCollection = collection(this.fs , `parties/`)
            const Partiedata = await addDoc(PartiesCollection, {
              miahootID: idMiahoot,
              questions: []
            })
            // const miahootActuel = doc(this.fs, `miahoot/${MiahootId}`)
            // await updateDoc(miahootActuel, {
            //   currentQCM: Partiedata.id
            // })
          }
        }
        )
      ).subscribe()
    });

  }
}
