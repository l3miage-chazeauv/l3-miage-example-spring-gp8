import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {
  
  public idReponse?:number;

  public idMia:number =1;
  public labelQuestion?:string;
  

  public labelReponse?:string;
  public estValide?:string;
  public questionId?:string;


  constructor(private apiMia: APIService) {}

  getAllMiahoots(){
    this.apiMia.getAPIAllMiahoots().subscribe((data: any) => {
    console.log(data);
    });
  }

  /*
postMiahoot(form : NgForm){
      const data = {
        "nom": form.value.name,
        "description": form.value.description,
      };

  */



postMiahoot(form : NgForm){
  
  const data = {
      "nom": form.value.nameMia,
      "description": form.value.descriptionMia,
  };
  this.apiMia.postAPIMiahoot(data).subscribe(
      //Permet de voir l'erreur dans la console ou le bon fonctionnement
      data => {
          if(data == null){
              console.log("Miahoot créé");
          }else{
              console.error(data);
          }          
      }
  );
}
    


  getQuestions(idMiahoot : number){
    this.apiMia.getAPIQuestionsByMiahootID(idMiahoot).subscribe((data: any) => {
    console.log(data);
    });
  }

  
  postQuestion(){
    this.apiMia.postAPIQuestion('miahoot/' + this.idMia+"/question?label="+ this.labelQuestion).subscribe(
      (data: any) => {
        console.log(data);
      });
  }


  getAllReponses(){
    this.apiMia.getAPIReponses('reponse').subscribe((data: any) => {
    console.log(data);
    });
  }


  postReponse(form : NgForm){
    console.log(form.value);
    const data = {
      "label": form.value.labelReponse,
      "estValide": form.value.estValide,
      "questionId": form.value.questionId
    };
    const jsonData = JSON.stringify(data);
    this.apiMia.postAPIReponse('question/' + this.questionId+"/reponse", jsonData).subscribe(
      (data: any) => {
        console.error(data);
        console.log(data);
      });
  }

}
