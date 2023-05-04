import { Component } from '@angular/core';
import { Miahoot } from '../QcmDefinitions';
import { Observable } from 'rxjs';
import { Auth, User, authState } from '@angular/fire/auth';
import { APIService } from '../api.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent {
  
  protected listePresentations: Miahoot[] = []; // liste des miahoots que l'user peut présenter
  public readonly user: Observable<User | null>; // utilisateur connecté

  idUserFB: string = "null"; // id FireBase de l'utilisateur connecté

  constructor(private auth: Auth, private apiMia: APIService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté
    
    this.user.subscribe( u => {
      if(u != null){
        this.idUserFB = u.uid; // récupération de l'id de l'utilisateur connecté
      }
    });

    this.apiMia.getAPIMmiahootsPresented(this.idUserFB).subscribe( (data: any) => {
      this.listePresentations = data;
    });

    console.log("Présentations : " + this.listePresentations);
  }

}
