import { Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  standalone: true,
})

export class QuestionComponent {

  @Input() question: Question = { label: '', reponses: []};

  constructor() { }

}