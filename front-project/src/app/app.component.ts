import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoutingService } from './routing.service';
import { UserService } from './user.service';
import { MiahootUser, Parties } from './QcmDefinitions';
import { GameService } from './game.service';
import { APIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  
  bsAuth = new BehaviorSubject<boolean>(false); // état de la connection
  public readonly user: Observable<MiahootUser | undefined>; // utilisateur connecté


  constructor(private auth: Auth, protected router: RoutingService, private ms : UserService, private game: GameService, private apiService: APIService) {
    this.user = this.ms.obsMiahootUser$; // récupération de l'utilisateur connecté
    
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
    this.ms.getUser().then(user => {
      this.apiService.getAPIAllUsers().subscribe(other => {
        
        let find = false;
        for(let i =0; i<other.length; i++){
          if(other[i].firebaseId === user?.uid){
            find = true;
          }
        }

        if(find == false){
          console.log("User non trouvé dans spring boot");
          this.apiService.postAPIUser(user?.displayName ? user.displayName : '', user?.uid).subscribe()
        }

      });
    });
  }

  //fonction pour se deconnecter de firebase
  async logout() {
    await signOut(this.auth); // on se déconnecte
    this.router.toHome(); // on retourne à la page d'accueil
    
  }

}
