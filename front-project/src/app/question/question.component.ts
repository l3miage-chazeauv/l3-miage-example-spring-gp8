import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question, Reponse } from '../QcmDefinitions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionComponent {

  @Input() question: Question = {id:1, label: '', reponses: [] };

  constructor(){
  }

}