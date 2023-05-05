import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../api.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-create-miahoot',
  templateUrl: './create-miahoot.component.html',
  styleUrls: ['./create-miahoot.component.css']
})
export class CreateMiahootComponent {

  public idMiahoot: number = 1;
  public idQuestion: number = 1;
  public idReponse: number = 1;
  public idUtilisateur: number = 1;

  constructor(private apiMia: APIService, protected router : RoutingService) { }

  ngOnInit(): void {

  }

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
}
