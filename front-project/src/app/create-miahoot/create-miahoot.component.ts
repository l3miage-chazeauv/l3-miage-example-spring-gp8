import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../api.service';
import { UserService } from '../user.service';
import { RoutingService } from '../routing.service';
import { ActivatedRoute } from '@angular/router';
import { InfosMiahoot, Miahoot, Question, Reponse } from '../QcmDefinitions';

@Component({
  selector: 'app-create-miahoot',
  templateUrl: './create-miahoot.component.html',
  styleUrls: ['./create-miahoot.component.css']
})
export class CreateMiahootComponent{

  public rep: boolean = false;
  public lastQuestionId?: number;
  public miahoot!: InfosMiahoot;
  public questions: Question[] = [];
  // public idReponse: number = 1;
  // public idUtilisateur: number = 1;
  public reponses: NgForm[]=[];

  public idMia!: number;


  constructor(protected apiMia: APIService, protected router : RoutingService, protected miaU : UserService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    this.idMia = this.route.snapshot.params['id'];
    console.log(this.idMia);

    //get le miahoot correspondant à l'id
    this.apiMia.getAPIMiahootById(this.idMia).subscribe(miahoot =>{
        this.miahoot = miahoot;
        //get les questions correspondant au miahoot recu
        this.apiMia.getAPIQuestionByMiahootID(this.miahoot.id).subscribe(questions =>{
            this.questions = questions;
            console.log(questions);
        });
    });

    
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

//   postMiahoot(form: NgForm) {
//     const data = {
//       "nom": form.value.nameMia,
//       "description": form.value.descriptionMia,
//       "firebaseId": this.idMia
//     }; 
//     this.apiMia.postAPIMiahoot(data).subscribe(
//       //Permet de voir l'erreur dans la console ou le bon fonctionnement
//       data => {
//         if (data == null) {
//           console.log("Miahoot créé");
//         } else {
//           console.error(data);
//         }
//         this.idMiahoot = data;
//       }
//     );
//   }

  async postQuestion(form: NgForm) {
    console.log(form.value.labelQuestion);
    //créer la question
    this.lastQuestionId = await this.apiMia.postAPIQuestionPr('miahoot/' + this.miahoot.id + "/question?label=" + form.value.labelQuestion);
    console.log("idQuest: " + this.lastQuestionId)
    //obtient la question et l'ajoute à la liste
    this.apiMia.getAPIQuestionById(this.lastQuestionId).subscribe(question =>{
        this.questions.push(question);
        this.cdr.detectChanges();
    })
  }
  deleteQuestion(questionId: number) {
    this.apiMia.deleteAPIQuestionById(questionId).subscribe(
        (data: any) => {
          if (data == null) {
            console.log("Question supprimé");
          } else {
            console.error(data);
          }
        });
    }
    // console.log(form.value.labelQuestion);
    // //créer la question
    // this.lastQuestionId = await this.apiMia.postAPIQuestionPr('miahoot/' + this.miahoot.id + "/question?label=" + form.value.labelQuestion);
    // console.log("idQuest: " + this.lastQuestionId)
    // //obtient la question et l'ajoute à la liste
    // this.apiMia.getAPIQuestionById(this.lastQuestionId).subscribe(question =>{
    //     this.questions.push(question);
    //     this.cdr.detectChanges();
    // })




  postReponse(form: NgForm, questionId: number) {
    let boolRep = false;
    if (form.value.estValide) {
      boolRep = true;
    }
    //Formater en format JSON
    const data = {
      "label": form.value.labelReponse,
      "estValide": boolRep,
    };

    this.apiMia.postAPIReponse('question/' + questionId + "/reponse", data).subscribe(
      (reponse: Reponse) => {
        if (reponse == null) {
          console.log("Reponse créee");
          this.questions.push
        } else {
          console.error(reponse);
        }
      });
  }
//   postQuestionAvecReponses(formQuestion: NgForm, reponses:NgForm[]):void{
//     this.postQuestion(formQuestion);
//     reponses.forEach(reponse => {
//       this.postReponse(reponse);
//     });}
}
