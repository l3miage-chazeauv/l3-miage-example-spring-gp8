import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { APIService } from './api.service';
import { RoutingService } from './routing.service';
import { MiahootService } from './miahoot.service';
import { MiahootUser, Parties } from './QcmDefinitions';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {



  
  bsAuth = new BehaviorSubject<boolean>(false); // état de la connection
  public readonly user: Observable<MiahootUser | undefined>; // utilisateur connecté
  public readonly parties: Observable<Parties | undefined>; // utilisateur connecté


  constructor(private auth: Auth, protected router: RoutingService, private ms : MiahootService, private game: GameService) {
    this.user = this.ms.obsMiahootUser$; // récupération de l'utilisateur connecté
    this.parties = this.game.obsParties$; // récupération de l'utilisateur connecté
    
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

    //créer un utilisateur dans la base de données Spring
    this.ms.getUser().then(data => {
      console.log("id : " + data?.uid);
      console.log("nom : " + data?.displayName);
    });

    this.parties.subscribe(data => {
      console.log("parties : " + data);
      // console.log("partie : " + data?.uid);
    });


  }

  //fonction pour se deconnecter de firebase
  async logout() {
    await signOut(this.auth); // on se déconnecte
    this.router.toHome(); // on retourne à la page d'accueil
  }

}
