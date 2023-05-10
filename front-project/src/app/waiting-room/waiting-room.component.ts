import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { GameService } from '../game.service';
import { MiahootUser } from '../QcmDefinitions';
import { MiahootComponent } from '../miahoot/miahoot.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingRoomComponent implements OnInit{

  nbUtilisateurs: number = 0;
  idMiahoot :string ="" ;
  idUserFB: string = '';

  protected obsNbUserConnected: Observable<any> = new Observable();



  constructor(private cdr: ChangeDetectorRef, protected gs: GameService, private user: UserService, private ar: ActivatedRoute,) {
    this.idMiahoot = this.ar.snapshot.params['id'];
    
    this.obsNbUserConnected = this.gs.setObsPartie(this.idMiahoot);
    this.obsNbUserConnected.subscribe((partie) => {
      this.nbUtilisateurs = partie[0].userConnected;
      this.cdr.detectChanges();
    });
    this.saveUserStatus();
  }


  ngOnInit() {
    // Écouteur d'événement pour l'événement beforeunload
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('unload', this.handleUnload);

    
    // Vérifier si l'utilisateur est revenu sur la page après un rafraîchissement
    console.log("localstorage avant if " + localStorage.getItem('usersConnected'));
    if (localStorage.getItem('usersConnected') == null) {

      this.saveUserStatus();
    this.gs.addConnectedUser(parseInt(this.idMiahoot));

      // sessionStorage.removeItem('usersConnected');
      // this.gs.suppConnectedUser(parseInt(this.idMiahoot)); 
    }else{
      this.checkUserStatus();
      // this.gs.suppConnectedUser(parseInt(this.idMiahoot));
    }

    // Vérifier si l'utilisateur est déjà connecté lors du chargement de la page
    //  this.checkUserStatus();
  }

  async checkUserStatus() {
    const storedUsersConnected = localStorage.getItem('usersConnected');
    console.log('storedUsersConnected', storedUsersConnected);
    if (storedUsersConnected === await this.user.getIdUserFB().then((user) => {
      this.idUserFB = user;
      return user;
    })) {
      // this.gs.suppConnectedUser(parseInt(this.idMiahoot));
      // console.log('storedUsersConnected', storedUsersConnected);
      // this.gs.suppConnectedUser(parseInt(this.idMiahoot));
      console.log('dans le if');
    }
  }

  async saveUserStatus(){
    localStorage.setItem('usersConnected', await this.user.getIdUserFB().then((user) => {
        this.idUserFB = user;
        return user;
      }));
      
  }

    ngOnDestroy() {
    // Supprimer l'écouteur d'événement lors de la destruction du composant

    //verifier si le idUserFr est présent dans le localstorage avant de le supprimer
    if (localStorage.getItem('usersConnected') == this.idUserFB) {
      localStorage.removeItem('usersConnected');
      this.gs.suppConnectedUser(parseInt(this.idMiahoot));
    }

    // this.gs.suppConnectedUser(parseInt(this.idMiahoot));
    // localStorage.setItem('closed', 'true');

    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('unload', this.handleUnload);
  }

  handleUnload(event: Event) {
    // Appeler la méthode de déconnexion lorsque l'événement de fermeture d'onglet ou de rafraîchissement se produit
    // this.gs.suppConnectedUser(parseInt(this.idMiahoot));s
    this.saveUserStatus();
  }

  handleBeforeUnload() {
    // L'utilisateur a quitté la page (fermeture d'onglet, changement d'URL, etc.)
    localStorage.setItem('closed', 'true');
    // this.gs.suppConnectedUser(parseInt(this.idMiahoot)); 
    this.saveUserStatus();

  }

}
