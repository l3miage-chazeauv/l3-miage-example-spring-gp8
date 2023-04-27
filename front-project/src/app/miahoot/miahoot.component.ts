import { Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';

@Component({
  selector: 'app-miahoot',
  templateUrl: './miahoot.component.html',
  styleUrls: ['./miahoot.component.css']
})

export class MiahootComponent /*implements OnInit*/ {

  @Input() listeQuestions:Question[]=[{questionId:999,label: 'montre toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
                                                                                      {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]},
                                      {questionId:998,label: 'cache toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
                                                                                     {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]}];

  public idCourant:number=0;
  
  questionSuivante():void{
    this.idCourant=this.idCourant+1;
  }
  questionPrecedente():void{
    if(this.idCourant>0){
      this.idCourant=this.idCourant-1;
    }
  }
  
  
  // questions: Question[];

  // constructor(private questionService: QuestionService) { }

  // ngOnInit(): void {
  //   this.getQuestions();
  // }

  // getQuestions(): void {
  //   this.questionService.getQuestions()
  //     .subscribe(questions => this.questions = questions);
  // }
}