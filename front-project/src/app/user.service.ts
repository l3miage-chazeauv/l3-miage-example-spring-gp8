import { Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import {  docData, Firestore, FirestoreDataConverter } from '@angular/fire/firestore';

import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { MiahootUser } from './QcmDefinitions';


const conv : FirestoreDataConverter<MiahootUser> = {
  toFirestore : val => val,
  fromFirestore :snap => ({
    miahootID : snap.get("miahootID"),
    name : snap.get("name"),
    photoUrl : snap.get("photoUrl"),
    id: snap.get("id")
  })
    
}

@Injectable({
  providedIn: 'root'
})

export class UserService{

  obsMiahootUser$ : Observable<MiahootUser|undefined>;

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

        // console.log(u)
      })
    ).subscribe()


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
  }


  //Retourne un User (firebase) si l'utilisateur est connecté, erreur sinon
  async getUser(): Promise<User | null> {
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

  //Retourne un MiahootUser (firebase) si l'utilisateur est connecté, erreur sinon
  async  getIdUserFB(): Promise<string> {
    const user = await this.getUser();
    if (user) {
      return user.uid;
    }
    return "nullUserId";
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

}