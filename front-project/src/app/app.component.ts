import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { QcmService } from './qcm.service';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { APIService } from './api.service';
import { RoutingService } from './routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  
  bsAuth = new BehaviorSubject<boolean>(false); // état de la connection
  public readonly user: Observable<User | null>; // utilisateur connecté

  constructor(private auth: Auth, firestore: Firestore, protected router: RoutingService, private apiMia: APIService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté
  }

  //Fonction pour se connecter à firebase
  async login() {
    this.bsAuth.next(true); // on passe l'état de la connection à true
    const googleProvider = new GoogleAuthProvider(); // on utilise le provider Google

    googleProvider.setCustomParameters({ // on demande à l'utilisateur de choisir son compte
      prompt: 'select_account'
    });

    try{
      await signInWithPopup(this.auth, googleProvider); // on ouvre une popup pour se connecter
    } catch(e){
      console.log("Login error (Google): " + e); // si erreur, on affiche l'erreur de login
    }

    this.bsAuth.next(false); // on passe l'état de la connection à false
  }

  //fonction pour se deconnecter de firebase
  async logout() {
    await signOut(this.auth); // on se déconnecte
    this.router.toHome(); // on retourne à la page d'accueil
  }

}
