import { Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';

@Component({
  selector: 'app-miahoot',
  templateUrl: './miahoot.component.html',
  styleUrls: ['./miahoot.component.css']
})

export class MiahootComponent /*implements OnInit*/ {

  @Input() listeQuestions:Question[]=[{id:1,label: 'test', reponses: []}];
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