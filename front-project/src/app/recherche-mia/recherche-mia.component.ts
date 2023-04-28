import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-recherche-mia',
  templateUrl: './recherche-mia.component.html',
  styleUrls: ['./recherche-mia.component.css']
})
export class RechercheMiaComponent {

  public idRecherche?:number;

  constructor(private apiMia : APIService, private routing: RoutingService) { }

  findMiahootById():void{
    this.apiMia.getAPIById('miahoot/' + this.idRecherche).subscribe((data:any)=>{
      console.log(data)
    
    })
  }
}
