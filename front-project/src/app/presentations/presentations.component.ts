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
<<<<<<< HEAD
  idUserFB: string = ""; // propriété pour stocker l'ID utilisateur
  protected listePresentations: Miahoot[] = []; // liste des miahoots que l'user peut présenter
=======
  
  protected listePresentations: any[] = []; // liste des miahoots que l'user peut présenter
>>>>>>> 7c2fcba9baf5d59ecb7521e476b86809155e9a43
  public readonly user: Observable<User | null>; // utilisateur connecté

  constructor(private auth: Auth, private apiMia: APIService, private data : DataService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté

  }

<<<<<<< HEAD
  ngOnInit(): void {
    this.data.getUser().then(id => {
      if (id != null) {
        this.idUserFB = id;
        this.apiMia.getAPIMmiahootsPresented(this.idUserFB).subscribe((data: any) => {
          this.listePresentations = data;
          console.log(this.listePresentations);
        });
=======
    Promise.all([userPromise, apiPromise]).then(([user, apiData]) => {
      if (apiData != null) {
        this.listePresentations = apiData as any[];
        // console.log(apiData);
        // console.log(user?.uid);
        // console.log(this.listePresentations)
        // le reste du code qui utilise les nouvelles valeurs de idUserFB et listePresentations
>>>>>>> 7c2fcba9baf5d59ecb7521e476b86809155e9a43
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

