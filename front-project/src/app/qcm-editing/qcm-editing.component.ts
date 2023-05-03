import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {

  public idMiahoot: number = 1;
  public idQuestion: number = 1;
  public idReponse: number = 1;

  constructor(private apiMia: APIService) { }

  getAllMiahoots() {
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



  postMiahoot(form: NgForm) {

    const data = {
      "nom": form.value.nameMia,
      "description": form.value.descriptionMia,
    };
    this.apiMia.postAPIMiahoot(data).subscribe(
      //Permet de voir l'erreur dans la console ou le bon fonctionnement
      data => {
        if (data == null) {
          console.log("Miahoot créé");
        } else {
          console.error(data);
        }
      }
    );
  }



  getQuestions() {
    this.apiMia.getAPIQuestionsByMiahootID(this.idMiahoot).subscribe((data: any) => {
      console.log(data);
    });
  }


  postQuestion(form: NgForm) {
    this.apiMia.postAPIQuestion('miahoot/' + this.idMiahoot + "/question?label=" + form.value.labelQuestion).subscribe(
      //Permet de voir l'erreur dans la console ou le bon fonctionnement
      data => {
        if (data == null) {
          console.log("Question créé");
        } else {
          console.error(data);
        }
      });
  }


  getAllReponses() {
    this.apiMia.getAPIReponses('reponse').subscribe((data: any) => {
      console.log(data);
    });
  }


  postReponse(form: NgForm) {

    let boolRep = false;
    if (form.value.estValide == "vrai") {
      boolRep = true;
    }
    //Formater en format JSON
    const data = {
      "label": form.value.labelReponse,
      "estValide": boolRep,
      "questionId": form.value.questionId
    };

    this.apiMia.postAPIReponse('question/' + form.value.idRep + "/reponse", data).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Reponse créee");
        } else {
          console.error(data);
        }
      });

  }

  deleteMiahoot() {
    this.apiMia.deleteAPIQMiahootById(this.idMiahoot).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Miahoot supprimé");
        } else {
          console.error(data);
        }
      });
  }

  deleteQuestion() {
    this.apiMia.deleteAPIQuestionById(this.idQuestion).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Question supprimé");
        } else {
          console.error(data);
        }
      });
  }

  deleteReponse() {
    this.apiMia.deleteAPIReponseById(this.idReponse).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Reponse supprimé");
        } else {
          console.error(data);
        }
      });
  }

  patchMiahoot(form: NgForm) {
    const data = {
      "id": form.value.idMia,
      "nom": form.value.nomMia,
      "description": form.value.descriptionMia,
    };
    this.apiMia.patchAPIMiahootById(form.value.idMia, data).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Miahoot modifié");
        } else {
          console.error(data);
        }
      });
  }

  patchQuestion(form: NgForm) {
    const data= {
      "id": form.value.idQuestion,
      "label": form.value.labelQuestion,
      "miahootId": form.value.idMiahoot,
      "reponses": [{
        "label": form.value.labelReponse,
        "estValide": form.value.estValide,
        "questionId": form.value.idQuestion,
      }]
    };
    

    this.apiMia.patchAPIQuestionById(form.value.idQuestion, data).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Question modifié");
        } else {
          console.error(data);
        }
      });
  }
}
