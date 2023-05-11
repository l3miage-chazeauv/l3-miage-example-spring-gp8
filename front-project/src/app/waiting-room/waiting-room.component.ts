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
export class WaitingRoomComponent implements OnInit {

  nbUtilisateurs: number = 0;
  idMiahoot: string = "";
  idUserFB: string = 'nullIdUserFB';
  idPresentateur: string = "nullIdPresentateur";
  // inGame = false;

  protected obsNbUserConnected: Observable<any> = new Observable();



  constructor(private cdr: ChangeDetectorRef, protected gs: GameService, private user: UserService, private ar: ActivatedRoute,) {
    //On récupère l'id du miaHoot
    this.idMiahoot = this.ar.snapshot.params['id'];

    this.obsNbUserConnected = this.gs.setObsPartie(this.idMiahoot);
    this.obsNbUserConnected.subscribe((partie) => {
      this.gs.inGame = partie[0].inGame;
      // console.log("InGame dans firebase " +this.gs.inGame);
      this.nbUtilisateurs = partie[0].userConnected;
      this.cdr.detectChanges();
    });

    //On récupère l'id du présentateur
    this.gs.getPresentateurMiahootPresente(this.idMiahoot).then((id) => {
      this.idPresentateur = id;
      console.log("idPresentateur " + this.idPresentateur);
      // this.cdr.detectChanges();
    });

    //On récupère l'id de l'utilisateur
    this.user.getIdUserFB().then((id) => {
      this.idUserFB = id;
      console.log("idUserFB " + this.idUserFB);
      // this.cdr.detectChanges();
    });



  }


  ngOnInit() {
    this.checkUserStatus();
  }


  async checkUserStatus() {
    //On regarde si c'est la première fois que l'utilisateur se connecte
    // if (localStorage.getItem('usersConnected') == null) {
      //On enregistre l'utilisateur comme connecté
      // this.saveUserStatus();
      // this.gs.addConnectedUser(parseInt(this.idMiahoot));
    // }
  }

  // async saveUserStatus() {
  //   localStorage.setItem('usersConnected', await this.user.getIdUserFB().then((user) => {
  //     this.idUserFB = user;
  //     return user;
  //   }));

  // }

  ngOnDestroy() {

    //On supprime l'utilisateur de la liste des connectés
    //si il quitte la page
    // if (localStorage.getItem('usersConnected') == this.idUserFB) {
    //   localStorage.removeItem('usersConnected');
    //   localStorage.setItem('closed', 'true');
      this.gs.suppConnectedUser(parseInt(this.idMiahoot));

    // }
  }
}
