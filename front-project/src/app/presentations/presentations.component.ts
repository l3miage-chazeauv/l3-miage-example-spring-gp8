import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Auth, User, authState } from '@angular/fire/auth';
import { APIService } from '../api.service';
import { UserService } from '../user.service';
import { RoutingService } from '../routing.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent {

  public labelRecherche: string = "";

  idUserFB: string = ""; // propriété pour stocker l'ID utilisateur
  protected listePresentations: any[] = []; // liste des miahoots que l'user peut présenter
  protected resultatRecherche: any[] = [];
  public readonly user: Observable<User | null>; // utilisateur connecté

  constructor(private auth: Auth,
    private apiMia: APIService,
    protected ms: UserService,
    private cdRef: ChangeDetectorRef,
    protected router: RoutingService,
    protected game: GameService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté

  }

  ngOnInit(): void {
    this.ms.getUser().then(u => {
      if (u != null) {
        this.idUserFB = u.uid;
        this.apiMia.getAPIMiahootsCreated(this.idUserFB).subscribe((data: any) => {
          this.listePresentations = data as any[];
          this.rechercheMiahootsByLabel("");
          this.cdRef.detectChanges();
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  /* renvois la liste de tous les miahoots avec le label contenu dans leurs description*/
  rechercheMiahootsByLabel(label: string) {
    this.resultatRecherche = this.listePresentations.filter((miahoot) => miahoot.description.includes(label));
  }

  /* on recherche les miahoot by label et on modifie la liste de presentations*/
  newListByLabel(): void {
    this.labelRecherche = this.labelRecherche.trim()
    this.rechercheMiahootsByLabel(this.labelRecherche)
  }
}
