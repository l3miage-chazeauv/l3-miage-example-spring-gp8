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

  constructor(private apiMia : APIService,protected router: RoutingService) { }
  /* Fonction de recherche parID qui interogera la BD et si le miahoot existe nous dirige sur la waitingRoom de ce miahoot
  searchMiahootById(id:string):void*/

  findMiahootById():void{
    this.apiMia.getAPI('miahoot/' + this.idRecherche).subscribe((data:any)=>{
      console.log(data)
    
    })
    

  }
}
