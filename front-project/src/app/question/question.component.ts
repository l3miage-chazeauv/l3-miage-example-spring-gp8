import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import {  Reponse } from '../QcmDefinitions';
import { GameService } from '../game.service';

@Component({
  selector: 'app-question[questionId][label][reponses][idPresentateur]',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionComponent {

  @Input() questionId!: number;
  @Input() label!: String;
  @Input() reponses!: Reponse[];
  @Input() idPresentateur!: string;

  @Output() incrVote = new EventEmitter<number>();
  @Output() decrVote = new EventEmitter<number>();

  constructor(private game: GameService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cdRef.detectChanges();
  }

  toggleEstCochee(index: number, estCochee: Boolean) {
    if (estCochee) {
      this.incrVote.emit(index);
    } else {
      this.decrVote.emit(index);
    }
  }

}
