import { Component, OnInit } from '@angular/core';
import { Miahoot } from '../QcmDefinitions';
import { Observable } from 'rxjs';
import { Auth, User, authState } from '@angular/fire/auth';
import { APIService } from '../api.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit {
  idUserFB?: string; // propriété pour stocker l'ID utilisateur
  protected listePresentations: Miahoot[] = []; // liste des miahoots que l'user peut présenter
  public readonly user: Observable<User | null>; // utilisateur connecté

  constructor(private auth: Auth, private apiMia: APIService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté
  }

  ngOnInit() {
    authState(this.auth).subscribe(u => {
      if (u != null) {
        this.idUserFB = u.uid; // mise à jour de l'ID utilisateur
        console.log("iduser: " + this.idUserFB);

        // Appel à l'API avec l'ID utilisateur récupéré
        this.apiMia.getAPIMmiahootsPresented(this.idUserFB).subscribe((data: any) => {
          this.listePresentations = data;
        });
      }
    });

  }
}

