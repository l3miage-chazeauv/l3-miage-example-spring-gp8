import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { GameService } from '../game.service';
import { MiahootUser } from '../QcmDefinitions';
import { MiahootComponent } from '../miahoot/miahoot.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, take } from 'rxjs';
import { UserService } from '../user.service';
import { docData, setDoc } from '@angular/fire/firestore';
import { set } from '@angular/fire/database';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingRoomComponent implements OnInit {

  @Input() url!:string;

  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";


  nbUtilisateurs: number = 0;
  idMiahoot: string = "";
  idUserFB: string = 'nullIdUserFB';
  idPresentateur: string = "nullIdPresentateur";

  protected obsNbUserConnected: Observable<any> = new Observable();



  constructor(private cdr: ChangeDetectorRef, protected gs: GameService, private user: UserService, private ar: ActivatedRoute) {
    //On récupère l'id du miaHoot
    this.idMiahoot = this.ar.snapshot.params['id'];

    

    this.myAngularxQrCode = this.url;
    this.obsNbUserConnected = this.gs.setObsPartie(this.idMiahoot);
      this.obsNbUserConnected.pipe().subscribe((partie) => {
        this.nbUtilisateurs = partie[0].userConnected;
  
        this.cdr.markForCheck();
      });

    

    //On récupère l'id du présentateur
    this.gs.getPresentateurMiahootPresente(this.idMiahoot).then((id) => {
      this.idPresentateur = id;
    });

    //On récupère l'id de l'utilisateur
    this.user.getIdUserFB().then((id) => {
      this.idUserFB = id;
    });

  }

  async ngOnInit() {
    this.checkUserStatus();
  }

  async checkUserStatus() {
    // On regarde si c'est la première fois que l'utilisateur se connecte
    if (localStorage.getItem('usersConnected') == null) {
      // On enregistre l'utilisateur comme connecté
      this.saveUserStatus();
      if(localStorage.getItem('usersConnected') == null){
        this.idUserFB = "123456789azerty";
        localStorage.setItem('usersConnected',this.idUserFB);
      }
      this.gs.addConnectedUser(parseInt(this.idMiahoot));

    }

  }

  async saveUserStatus() {
    
    localStorage.setItem('usersConnected', await this.user.getIdUserFB().then((user) => {
      console.log("son Firebase ID : " + user);
      this.idUserFB = user;
      return user;
    }));
  }

  async ngOnDestroy() {
    //On supprime l'utilisateur de la liste des connectés
    //si il quitte la page
      localStorage.removeItem('usersConnected');

    this.gs.suppConnectedUser(parseInt(this.idMiahoot));

    
  }

  start(){
    this.gs.startGame(this.idMiahoot);
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

}
