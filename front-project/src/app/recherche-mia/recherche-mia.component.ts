import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { catchError, of } from 'rxjs';
import { APIService } from '../api.service';
import { RoutingService } from '../routing.service';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { DocumentData, DocumentReference, Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-recherche-mia',
  templateUrl: './recherche-mia.component.html',
  styleUrls: ['./recherche-mia.component.css']
})
export class RechercheMiaComponent {

  public idRecherche?: number;
  public existe: boolean = true;

  constructor(private apiMia: APIService,
    protected rt: RoutingService,
    private ms: UserService,
    private cdRef: ChangeDetectorRef,
    private game: GameService,
    private fs: Firestore) {
  }

  async findMiahootByIdAndGo(): Promise<void> {
    this.existe = true;
    if (!(this.idRecherche === undefined || this.idRecherche === null)) {
      this.apiMia.getAPIMiahootById(this.idRecherche).pipe(
        catchError(e => {
          console.log(e.status);
          this.existe = false;
          this.cdRef.detectChanges();
          return of();
        })
      ).subscribe(async (data: any) => {
        if (await this.game.verifMiahootPresente(data.id) === true) {
          // on récupère l'id de l'utilisateur FB
          const idUserFB: string = await this.ms.getUser().then(u => {
            if (u != null) {
              return u.uid;
            } else {
              this.existe = false;
              this.cdRef.detectChanges();
              return "";
            }
          }).catch(error => {
            console.log(error);
            this.existe = false;
            this.cdRef.detectChanges();
            return "";
          }).toString();
          if (this.existe === true) {
            // on récupère le miahoot dans la base de données
            const partieData: DocumentReference<DocumentData> = await this.game.getMiahootPresente(data.id);
            this.game.addMIdToUser(partieData, idUserFB);
            this.rt.toMiahoot(this.idRecherche);
            //ajouter un utilisateur connecté à la partie
            //appel de la fonction addConnectedUser
            if (this.idRecherche != undefined) {
              // this.game.addConnectedUser(this.idRecherche);
              this.game.getNumberOfUserConnected(this.idRecherche);
            }
          }
        } else {
          this.existe = false;
          this.cdRef.detectChanges();
        }
      })
    }

  }
}
