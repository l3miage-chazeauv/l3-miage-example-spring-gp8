import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../api.service';
import { UserService } from '../user.service';
import { RoutingService } from '../routing.service';
import { ActivatedRoute } from '@angular/router';
import { InfosMiahoot, Miahoot, Question, Reponse } from '../QcmDefinitions';
import { GameService } from '../game.service';

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

  constructor(protected apiMia: APIService, 
              protected router : RoutingService, 
              protected miaU : UserService, 
              private route: ActivatedRoute, 
              private cdr: ChangeDetectorRef,
              private gameService: GameService) {

    this.idMia = this.route.snapshot.params['id'];
    //get le miahoot correspondant à l'id
    this.apiMia.getAPIMiahootById(this.idMia).subscribe(miahoot =>{
        //verifie que l'utilisateur est un concepteur
        this.apiMia.getAPIConcepteurs(miahoot.id).subscribe(concepteurs =>{
            this.miaU.getIdUserFB().then(fbId => {
                if(concepteurs.some((concepteur: any) =>{
                    return concepteur.firebaseId == fbId;
                })){
                    //fonctionnement normal
                    this.miahoot = miahoot;
                    //get les questions correspondant au miahoot recu
                    this.apiMia.getAPIQuestionByMiahootID(this.miahoot.id).subscribe(questions =>{
                        this.questions = questions;
                        this.cdr.detectChanges();
                        console.log(questions);
                    });
                }
                else{
                    //redirige l'utilisateur car n'est pas autorisé à modifier le miahoot
                    this.router.toPresentations();
                }
            });
        })
    });  
  }

  valide(form: NgForm){
    form.value.estCorrecte = !form.value.estCorrecte;
  }

  async postQuestion(form: NgForm) {
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
            //question bien supprimée
            this.questions = this.questions.filter(question => question.id != questionId);
            this.cdr.detectChanges();
            console.log("Question supprimé");
          } else {
            console.error(data);
          }
        });
    }

  postReponse(form: NgForm, questionId: number) {
    // console.log(form.value);
    //Formater en format JSON
    const data = {
      label: form.value.labelReponse,
      estCorrecte: form.value.estCorrecte,
    };
    console.log(data);
    this.apiMia.postAPIReponse('question/' + questionId + "/reponse", data).subscribe(
      (reponseId: number) => {
        //recuperer la reponse créée
        this.apiMia.getAPIReponseById(reponseId).subscribe(reponse=>{
            console.log(reponse);
            this.questions.filter(question => question.id === questionId)[0].reponses.push(reponse);
            this.cdr.detectChanges();});
      });
  }

  deleteReponse(reponseId : number){
    //recupere l'id de la question
    this.apiMia.getAPIReponseById(reponseId).subscribe(reponse=>{
        const question = this.questions.filter(question => question.id === reponse.questionId)[0];
        question.reponses = question.reponses.filter(reponse => reponse.id !== reponseId);
        this.cdr.detectChanges();
    });
    //recupere la question
    //filter
    this.apiMia.deleteAPIReponseById(reponseId).subscribe(
        (data: any) => {
          if (data == null) {
            //reponse bien supprimée
            console.log("Question supprimé");
          } else {
            console.error(data);
          }
        });
  }
  deleteMiahoot(miahootId: number) {
    this.apiMia.deleteAPIQMiahootById(miahootId).subscribe(
        (data: any) => {
          if (data == null) {
            //miahoot bien supprimé
            //redirige
            this.router.toPresentations();
          } else {
            console.error(data);
          }
        });
    }
}
