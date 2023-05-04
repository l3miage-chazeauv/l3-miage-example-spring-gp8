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
  
  protected listePresentations: any[] = []; // liste des miahoots que l'user peut présenter
  public readonly user: Observable<User | null>; // utilisateur connecté

  idUserFB: string = "nullUser"; // id FireBase de l'utilisateur connecté

  constructor(private auth: Auth, private apiMia: APIService) {
    this.user = authState(this.auth); // récupération de l'utilisateur connecté
    
    // this.user.subscribe( u => {
      
    //   if(u != null){
    //     this.idUserFB = u.uid; // récupération de l'id de l'utilisateur connecté
    //   }

    //   this.apiMia.getAPIMmiahootsPresented(this.idUserFB).subscribe( (data: any) => {
    //     this.listePresentations = data;
    //   });

    // });

    const userPromise = new Promise<User | null>((resolve, reject) => {
      this.user.subscribe(
        u => {
          if (u != null) {
            this.idUserFB = u.uid;
          }
          resolve(u);
        },
        error => reject(error)
      );
    });
    
    const apiPromise = userPromise.then(user => {
      if (user != null) {
        return this.apiMia.getAPIMmiahootsPresented(this.idUserFB).toPromise();
      } else {
        return null;
      }
    });

    Promise.all([userPromise, apiPromise]).then(([user, apiData]) => {
      if (apiData != null) {
        this.listePresentations = apiData as any[];
        // console.log(apiData);
        // console.log(user?.uid);
        // console.log(this.listePresentations)
        // le reste du code qui utilise les nouvelles valeurs de idUserFB et listePresentations
      }
    }).catch(error => {
      console.log(error);
    });
  }

}
