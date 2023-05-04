import { Injectable, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { docData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { MiahootGame } from './QcmDefinitions';


export interface MiahootUser{
  //readonly miahootId ?: number; // L'id pas obligatoire c'est plus du bricolage qu'autre chose...
  name: string
  readonly photoUrl : string
}


const conv : FirestoreDataConverter<MiahootUser> = {
  toFirestore : val => val,
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ):MiahootUser{
    const data = snapshot.data(options)!;
    
    return {
      //miahootId: data['id'],
      name : data['name'],
      photoUrl: data['photoUrl']
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class DataService{

  // obsMiahootGames$ = new Observable<MiahootGame[] | undefined>;
  listeMiahoots: number[] = []; // Liste des miahoots (id seulement)
  listeMiahootPresentes: number[] = [8,1]; // Liste des miahoots présentés (id seulement)

  obsMiahootUser$ : Observable<MiahootUser|undefined>;
  public test : number = 555;

  constructor(private auth: Auth, private fs : Firestore) {
    authState(this.auth).pipe(
      filter( u => !!u ),
      map( u => u as User ),
      tap( async u => {
        const docUser =  doc(this.fs, `users/${u.uid}`).withConverter(conv) ;
        const snapUser = await getDoc( docUser );
        if (!snapUser.exists()) {
          setDoc(docUser, {
            name: u.displayName ?? u.email ?? u.uid,
            photoUrl: u.photoURL ?? ""
          } satisfies MiahootUser)
        }
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
    this.test = 555;
  }

}