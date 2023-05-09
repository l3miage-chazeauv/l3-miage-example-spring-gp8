import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../api.service';
import { MiahootService } from '../miahoot.service';
import { Question } from '../QcmDefinitions';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-create-miahoot',
  templateUrl: './create-miahoot.component.html',
  styleUrls: ['./create-miahoot.component.css']
})
export class CreateMiahootComponent {

  public rep: boolean = false;

  public idMia: string | undefined; 
  public idMiahoot?: number;
  public idQuestion?: number;
  public idReponse: number = 1;
  public idUtilisateur: number = 1;


  constructor(private apiMia: APIService, protected router : RoutingService, protected miaU : MiahootService) {
    
  }

  ngOnInit(): void {
    this.miaU.getUser().then( data => {
      console.log(data?.uid);
      this.idMia=  data?.uid;
    }).then(() =>{
      console.log(this.idMia)
    }) 
  }

  valide(form: NgForm){
    form.value.estValide=!form.value.estValide;
  }

  // /*renvois l'id du dernier miahoot crée*/
  // rechercheIdMiahoot(){
  //   this.apiMia.getAPIAllMiahoots().pipe().subscribe(m =>  {
  //     const dernierObjet = m[m.length - 1];
  //     this.idMiahoot = dernierObjet.id;
  //   });}

  // rechercheIdMiahootByLabel(label: string): void {
  //     this.apiMia.getAPIAllMiahoots().subscribe((m: any[]) => {
  //       const miahootWithLabel = m.find((miahoot) => miahoot.label === label);
  //       if (miahootWithLabel) {
  //         this.idMiahoot = miahootWithLabel.id;
  //       } else {
  //         console.error(`No miahoot found with label ${label}`);
  //       }
  //     });
  //   }

  postMiahoot(form: NgForm) {
    const data = {
      "nom": form.value.nameMia,
      "description": form.value.descriptionMia,
      "firebaseId": this.idMia
    }; 
    this.apiMia.postAPIMiahoot(data).subscribe(
      //Permet de voir l'erreur dans la console ou le bon fonctionnement
      data => {
        if (data == null) {
          console.log("Miahoot créé");
        } else {
          console.error(data);
        }
        this.idMiahoot = data;
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
        this.idQuestion = data;
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
    };

    this.apiMia.postAPIReponse('question/' + this.idQuestion + "/reponse", data).subscribe(
      (data: any) => {
        if (data == null) {
          console.log("Reponse créee");
        } else {
          console.error(data);
        }
      });
  }


  postQuestionAvecReponses(formQuestion: NgForm, reponses:NgForm[]):void{
    this.postQuestion(formQuestion);
    reponses.forEach(reponse => {
      this.postReponse(reponse);
    });}
}
