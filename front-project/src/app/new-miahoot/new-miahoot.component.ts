import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../api.service';
import { RoutingService } from '../routing.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-miahoot',
  templateUrl: './new-miahoot.component.html',
  styleUrls: ['./new-miahoot.component.css']
})
export class NewMiahootComponent {
    public idMia: string | undefined;

    constructor(private apiMia: APIService, protected router : RoutingService, protected miaU : UserService) {
    
    }
  
    ngOnInit(): void {
      this.miaU.getUser().then( data => {
        console.log(data?.uid);
        this.idMia=  data?.uid;
      }).then(() =>{
        console.log(this.idMia)
      }) 
    }
    
    postMiahoot(form: NgForm) {
        const data = {
          "nom": form.value.nameMia,
          "description": form.value.descriptionMia,
          "firebaseId": this.idMia
        }; 
        this.apiMia.postAPIMiahoot(data).subscribe(
          //Permet de voir l'erreur dans la console ou le bon fonctionnement
          miahootId => {
            if (typeof miahootId == "number") {
              console.log("Miahoot créé");
              this.router.toCreateMiahoot(miahootId);
            } else {
              console.error(miahootId);
            }
            // recuperer
          }
        );
      }
}
