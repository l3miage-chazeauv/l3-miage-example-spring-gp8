import { Injectable, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { docData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreModule } from '@angular/fire/firestore';

import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { Miahoot, MiahootGame } from './QcmDefinitions';
import { APIService } from './api.service';



export interface MiahootUser{
  readonly miahootID ?: string; // L'id pas obligatoire c'est plus du bricolage qu'autre chose...
  name: string
  readonly photoUrl : string
}

export interface Partie{
  questions: string
}

const conv2 : FirestoreDataConverter<Partie> = {
  toFirestore : val => val,
  fromFirestore : snap => ({
    questions : snap.get("questions")
  })
}

const conv : FirestoreDataConverter<MiahootUser> = {
  toFirestore : val => val,
  fromFirestore :snap => ({
    miahootID : snap.get("miahootID"),
    name : snap.get("name"),
    photoUrl : snap.get("photoUrl")
  })
    
}

@Injectable({
  providedIn: 'root'
})

export class MiahootService{
  listeMiahoots: number[] = []; // Liste des miahoots (id seulement)
  listeMiahootPresentes: number[] = []; // Liste des miahoots présentés (id seulement)

  obsMiahootUser$ : Observable<MiahootUser|undefined>;
  obsPartie$ : Observable<Partie|undefined> = of();


  constructor(private auth: Auth, private fs : Firestore) {
    authState(this.auth).pipe(
      filter( u => !!u ),
      map( u => u as User ),
      tap( async u => {
        const docUser =  doc(this.fs, `users/${u.uid}`).withConverter(conv) ;
        const snapUser = await getDoc( docUser );
        if (!snapUser.exists()) {
          setDoc(docUser, {
            miahootID: "",
            name: u.displayName ?? u.email ?? u.uid,
            photoUrl: u.photoURL ?? ""

          } satisfies MiahootUser)
        }

        console.log(u)
      })
    ).subscribe()

    console.log("dans le constructeur de miahoot service")
    // this.obsPartie$.pipe(
    //   filter( p => !!p ),
    //   map( p => p as Partie ),
    //   tap( async p => {
    //     const docPartie =  doc(this.fs, `parties/0PKd0zanf4t7QSKXLcvV`).withConverter(conv2);
    //     const snapPartie = docData( docPartie );
    //     // if (!snapPartie.exists()) {
    //     //   setDoc(docPartie, {
    //     //     questions: p.questions
    //     //   } satisfies Partie)
    //     // }
    //     console.log("partie dans lecture firebase  : " +snapPartie)
    //     console.log("partie dans lecture firebase  : " +p)
    //     console.log("partie dans lecture firebase  : " +p.questions)
    //   })
    // ).subscribe()

    this.obsMiahootUser$ = authState(this.auth).pipe(
      switchMap( (user) => {
        if(user){
          const userRef = doc(this.fs , `users/${user.uid}`).withConverter(conv)
          const userData$ = docData(userRef)
          return userData$
        } else{
          return of(undefined)
        }
      })
    )

    this.obsPartie$ = authState(this.auth).pipe(
      switchMap( (user) => {
        if(user){
          const partieRef = doc(this.fs , `parties/0PKd0zanf4t7QSKXLcvV`).withConverter(conv2)
          const partieData$ = docData(partieRef)
          return partieData$
        } else{
          return of(undefined)
        }
      })
    )

    
    
  }


  //Retourne un User (firebase) si l'utilisateur est connecté, erreur sinon
  getUser(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      authState(this.auth).subscribe(u => {
        if (u != null) {
          resolve(u);
        }
      }, error => {
        reject(error);
      });
    });
  }

  //Mettre à jour l'utilisateur courant dans firebase
  update(up: Partial<MiahootUser>) {
    const user = this.auth.currentUser;
    if (user) {
      const userRef = doc(this.fs, `users/${user.uid}`).withConverter(conv)
      updateDoc(userRef, up)
    }
    
  }

  //mettre a jour photo de profil
  updatePhoto(up: Partial<MiahootUser>) {
    const user = this.auth.currentUser;
  }

  //Ajouter l'id du miahoot passé en paramètre à la liste des miahoots présentés
  addMiahootPresente(idMiahoot: number): void {
    if(!this.listeMiahootPresentes.includes(idMiahoot)){
      this.listeMiahootPresentes.push(idMiahoot);
      // lien front-back
    }
  }

}