import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, take } from 'rxjs';
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


  idUserFB = new BehaviorSubject<string>("nullIdUserFB");
  idPresentateur = new BehaviorSubject<string>("nullIdPresentateur");

  protected obsNbUserConnected: Observable<any> = new Observable();

  constructor(private cdr: ChangeDetectorRef, protected gs: GameService, private user: UserService, private ar: ActivatedRoute) {

    //On récupère l'id du miaHoot
    this.idMiahoot = this.ar.snapshot.params['id'];


    this.obsNbUserConnected = this.gs.setObsPartie(this.idMiahoot);
    this.obsNbUserConnected.pipe().subscribe((partie) => {
      this.nbUtilisateurs = partie[0].userConnected;

      this.cdr.markForCheck();
    });

  }

  async ngOnInit() {
    this.checkUserStatus();

    //On récupère l'id du présentateur
    const id = await this.gs.getPresentateurMiahootPresente(this.idMiahoot)
    this.idPresentateur.next(id);

    //On récupère l'id de l'utilisateur
    await this.user.getIdUserFB().then((id) => {
      this.idUserFB.next(id);
      this.cdr.detectChanges();
    });

  }

  async checkUserStatus() {
    // On regarde si c'est la première fois que l'utilisateur se connecte
    if (localStorage.getItem('usersConnected') == null) {
      // On enregistre l'utilisateur comme connecté
      this.saveUserStatus();
      if (localStorage.getItem('usersConnected') == null) {
        this.idUserFB.next("123456789azerty");
        localStorage.setItem('usersConnected', this.idUserFB.value);
      }
      this.gs.addConnectedUser(parseInt(this.idMiahoot));
    }
  }

  async saveUserStatus() {

    localStorage.setItem('usersConnected', await this.user.getIdUserFB().then((user) => {
      console.log("son Firebase ID : " + user);
      this.idUserFB.next(user);
      return user;
    }));
  }

  async ngOnDestroy() {
    //On supprime l'utilisateur de la liste des connectés
    //si il quitte la page
    localStorage.removeItem('usersConnected');
    this.gs.suppConnectedUser(parseInt(this.idMiahoot));

  }

  start() {
    this.gs.startGame(this.idMiahoot);
  }

}
