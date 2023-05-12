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
        this.idMia=  data?.uid;
      }).then(() =>{
      }) 
    }
    
    postMiahoot(form: NgForm) {
        const data = {
          "nom": form.value.nameMia,
          "description": form.value.descriptionMia,
          "firebaseId": this.idMia
        }; 
        this.apiMia.postAPIMiahoot(data).subscribe(
          miahootId => {
            if (typeof miahootId == "number") {
              this.router.toCreateMiahoot(miahootId);
            } 
          }
        );
      }
}
