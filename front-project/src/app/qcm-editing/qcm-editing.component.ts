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
  public labelQuestion?:string;
  public nameMia?:string;
  public descriptionMia?:string;
  public dataMia?:[string];

  constructor(private apiMia: APIService) {}

  getAllMiahoot(){
    this.apiMia.getAPIMiahoots('miahoot').subscribe((data: any) => {
    console.log(data);
    });
  }

  postMiahoot(){
    const data = {
      "nom": this.nameMia,
      "description": this.descriptionMia
    };
    const jsonData = JSON.stringify(data);

    this.apiMia.postAPIMiahoot('miahoot', data).subscribe(
        
      
        //Permet de voir l'erreur dans la console ou le bon fonctionnement
        error => {
        console.error(error);
        
      });
  }


  getQuestions(){
    this.apiMia.getAPIMiahootByID('miahoot',this.idMiahoot).subscribe((data: any) => {
    console.log(data);
    });
  }

  
  postQuestion(){
    this.apiMia.postAPIQuestion('miahoot/' + this.idMiahoot+"/question?label="+ this.labelQuestion).subscribe(
      (data: any) => {
        console.log(data);
      });
  }


  getReponses(){
    this.apiMia.getAPIReponses('reponse').subscribe((data: any) => {
    console.log(data);
    });
  }

  
  


  
  

}
