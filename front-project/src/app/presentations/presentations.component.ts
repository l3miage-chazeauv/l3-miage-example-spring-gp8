import { Component, OnInit } from '@angular/core';
import { Miahoot } from '../QcmDefinitions';
import { Observable } from 'rxjs';
import { Auth, User, authState } from '@angular/fire/auth';
import { APIService } from '../api.service';
import { MiahootService } from '../miahoot.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent {
  idUserFB: string = ""; // propriété pour stocker l'ID utilisateur
  protected listePresentations: any[] = []; // liste des miahoots que l'user peut présenter
  public readonly user: Observable<User | null>; // utilisateur connecté

  constructor(private auth: Auth, private apiMia: APIService, private ms : MiahootService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté

  }

  ngOnInit(): void {
    this.ms.getUser().then(u => {
      if (u != null) {
        this.idUserFB = u.uid;
        this.apiMia.getAPIMmiahootsPresented(this.idUserFB).subscribe((data: any) => {
          this.listePresentations = data as any[];
          console.log(this.listePresentations);
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

