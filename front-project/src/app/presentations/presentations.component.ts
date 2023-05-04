import { Component, OnInit } from '@angular/core';
import { Miahoot } from '../QcmDefinitions';
import { Observable } from 'rxjs';
import { Auth, User, authState } from '@angular/fire/auth';
import { APIService } from '../api.service';
import { DataService } from '../miahoot.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent {
  idUserFB: string = ""; // propriété pour stocker l'ID utilisateur
  protected listePresentations: any[] = []; // liste des miahoots que l'user peut présenter
  public readonly user: Observable<User | null>; // utilisateur connecté

  constructor(private auth: Auth, private apiMia: APIService, private data : DataService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté

  }

  ngOnInit(): void {
    this.data.getUser().then(id => {
      if (id != null) {
        this.idUserFB = id;
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

