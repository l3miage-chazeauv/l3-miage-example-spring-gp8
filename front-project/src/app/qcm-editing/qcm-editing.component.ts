import { Component } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {
  
  public idQuestion?:number;
  public idReponse?:number;

  public idMiahoot:number =1;

  public nameMia?:string;
  public descriptionMia?:string;
  public dataMia?:[string];

  constructor(private apiMia: APIService) {}

  getMiahoot(){
    this.apiMia.getAPI('miahoot').subscribe((data: any) => {
    console.log(data);
    });
  }


  //Test mais renvoie une erreur 400 voir la fonctionAPIMiahoot 
  //Pour avoir plus de précision sur l'erreur et sur mes avancées
  //C'est surtout pour toi ca Vincent, si tu t'ennnui 
  postMiahoot(){
    const data = {
      "nom": this.nameMia,
      "description": this.descriptionMia
    };
    const jsonData = JSON.stringify(data);

    this.apiMia.postAPIMiahoot('miahoot', jsonData).subscribe(
        
      
        //Permet de voir l'erreur dans la console ou le bon fonctionnement
        error => {
        console.error(error);
        
      });
  }

  //Test mais renvoie une erreur 400, mieux que 500 déjà
  postQuestion(){
    this.apiMia.postAPIQuestion('miahoot/1/question?label=Toi%20aussi%20t%27as%207%20%3F').subscribe( error => {
      console.error(error);
    });
  }



  
  getQuestions(){
    this.apiMia.getMiahootByID('miahoot',this.idMiahoot).subscribe((data: any) => {
    console.log(data);
    });
  }



  getReponses(){
    this.apiMia.getAPI('reponse/').subscribe((data: any) => {
    console.log(data);
    });
  }

}
