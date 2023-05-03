import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {
  
  public idMia: number =1;


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
    


  getQuestions(){
    this.apiMia.getAPIQuestionsByMiahootID(this.idMia).subscribe((data: any) => {
    console.log(data);
    });
  }

  
  postQuestion(form : NgForm){
    this.apiMia.postAPIQuestion('miahoot/' + this.idMia+"/question?label="+ form.value.labelQuestion).subscribe(
      //Permet de voir l'erreur dans la console ou le bon fonctionnement
      data => {
          if(data == null){
              console.log("Question créé");
          }else{
              console.error(data);
          }          
      });
  }


  getAllReponses(){
    this.apiMia.getAPIReponses('reponse').subscribe((data: any) => {
    console.log(data);
    });
  }


  postReponse(form : NgForm){
    
    let boolRep = false;
    if(form.value.estValide == "vrai"){
      boolRep = true;
    }
    //Formater en format JSON
    const data = {
      "label": form.value.labelReponse,
      "estValide": boolRep,
      "questionId": form.value.questionId
    };
    
    this.apiMia.postAPIReponse('question/' + form.value.idRep+"/reponse", data).subscribe(
      (data: any) => {
        if(data == null){
          console.log("Reponse créee");
      }else{
          console.error(data);
      } 
      });        
    
  }

}
