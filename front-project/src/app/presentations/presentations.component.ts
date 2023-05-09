import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Miahoot } from '../QcmDefinitions';
import { Observable } from 'rxjs';
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
  idUserFB: string = ""; // propriété pour stocker l'ID utilisateur
  protected listePresentations: any[] = []; // liste des miahoots que l'user peut présenter
  public readonly user: Observable<User | null>; // utilisateur connecté

  constructor(private auth: Auth, 
              private apiMia: APIService, 
              protected ms : UserService, 
              private cdRef: ChangeDetectorRef, 
              protected router : RoutingService,
              protected game: GameService) {

    this.user = authState(this.auth); // récupération de l'utilisateur connecté

  }

  ngOnInit(): void {
    this.ms.getUser().then(u => {
      if (u != null) {
        this.idUserFB = u.uid;
        this.apiMia.getAPIMmiahootsPresented(this.idUserFB).subscribe((data: any) => {
          this.listePresentations = data as any[];
          this.cdRef.detectChanges();
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

