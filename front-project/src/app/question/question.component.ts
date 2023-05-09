import { R3PartialDeclaration } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question, Reponse } from '../QcmDefinitions';
import { GameService } from '../game.service';

@Component({
  selector: 'app-question[questionId][label][reponses]',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionComponent {

  @Input() questionId!: number;
  @Input() label!: String;
  @Input() reponses!: Reponse[];
  @Input() idPresentateur?: string;

  constructor(private game: GameService) {

  }

}
