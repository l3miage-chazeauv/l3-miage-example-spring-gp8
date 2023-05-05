import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../api.service';
import { MiahootUser } from '../miahoot.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-create-miahoot',
  templateUrl: './create-miahoot.component.html',
  styleUrls: ['./create-miahoot.component.css']
})
export class CreateMiahootComponent {

  public etape: number =1;
  public rep: boolean = false;

  public idMiahoot: number = 1;
  public idQuestion: number = 1;
  public idReponse: number = 1;
  public idUtilisateur: number = 1;

  constructor(private apiMia: APIService, protected router : RoutingService, protected miaU : MiahootUser) {}

  ngOnInit(): void {

  }

/* je recupere l'id de la question et je recharge l'onglet reponse pour la meme question*/
  reponseSuivante(idQuestion: number){

  }

  ajouterRep(){
    this.rep===true;
  }

  valide(form: NgForm){
    form.value.estValide=!form.value.estValide;
  }

  etapeSuivante(){
    this.etape++;
  }

  etapePrecedente(){
    this.etape--;
  }

  postMiahoot(form: NgForm) {
    const data = {
      "nom": form.value.nameMia,
      "description": form.value.descriptionMia,
      "firebaseId": "oVLz2O1xBNOy0ij87JmckXitmmP2"
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
    if (form.value.estValide) {
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
