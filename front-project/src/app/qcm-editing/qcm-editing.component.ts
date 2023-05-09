import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {

  public idMiahoot: number = 1;
  public idQuestion: number = 1;
  public idReponse: number = 1;
  public idUtilisateur?: string;

  constructor(private apiMia: APIService, private ms : UserService) {
    this.ms.getUser().then((data) => {

      this.idUtilisateur = data?.uid;
      console.log(this.idUtilisateur);
      });

   }

  getAllMiahoots() {
    this.apiMia.getAPIAllMiahoots().subscribe((data: any) => {
      console.log(data);
    });
  }

  

  getAllQuestions() {
    this.apiMia.getAPIAllQuestions().subscribe((data: any) => {
      console.log(data);
    });
  }

  getQuestions() {
    this.apiMia.getAPIQuestionsByMiahootID(this.idMiahoot).subscribe((data: any) => {
      console.log(data);
    });
  }

  getQuestion() {
    this.apiMia.getAPIQuestionByMiahootID(this.idMiahoot).subscribe((data: any) => {
      console.log(data);
    });
  }


  getAllReponses() {
    this.apiMia.getAPIReponses('reponse').subscribe((data: any) => {
      console.log(data);
    });
  }

  getAllUsers() {
    this.apiMia.getAPIAllUsers().subscribe((data: any) => {
      console.log(data);
    });
  }

  // getUserById() {
  //   this.apiMia.getAPIUserById(this.idUtilisateur).subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }

  postUser(form: NgForm) {
    const data = {
      "username": form.value.username,
      "firebaseId": form.value.firebaseId,
    };
    this.apiMia.postAPIUser(data).subscribe(
      //Permet de voir l'erreur dans la console ou le bon fonctionnement
      data => {
        if (data == null) {
          console.log("Utilisateur créé");
        } else {
          console.error(data);
        }
      }
    );
  }



  postMiahoot(form: NgForm) {
    console.log("Post miahoot");
    const data = {
      "nom": form.value.nameMia,
      "description": form.value.descriptionMia,
      "firebaseId": this.idUtilisateur
    };
    console.log(data);
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


  postQuestion(form: NgForm) {
    console.log(form.value.labelQuestion);
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

  patchReponse(form: NgForm) {

    let boolRep = false;
    if (form.value.estValide == "vrai") {
      boolRep = true;
    }
    const data = {
      "label": form.value.labelReponse,
      "estValide": boolRep,
      "questionId": form.value.idQuestion,
    };
    console.log(data);
    this.apiMia.patchAPIReponseById(form.value.idQuestion, data).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Reponse modifié");
        } else {
          console.error(data);
        }
      });
  }


  // deleteUser() {
  //   this.apiMia.deleteAPIUserById(this.idUtilisateur).subscribe(
  //     (data: any) => {
  //       if (data == null) {
  //         console.log("Utilisateur supprimé");
  //       } else {
  //         console.error(data);
  //       }
  //     });
  // }

  patchUser(form: NgForm) {
    const data = {
      "id": form.value.idUtilisateur,
      "username": form.value.username,
      "firebaseId": form.value.firebaseId,
    };
    this.apiMia.patchAPIUserById(form.value.idUtilisateur, data).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Utilisateur modifié");
        } else {
          console.error(data);
        }
      });
    }
}
