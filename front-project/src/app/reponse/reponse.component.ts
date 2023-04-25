import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Reponse } from '../QcmDefinitions';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReponseComponent {

  @Input() reponse: Reponse = { label: '', estValide: false};
  
  constructor() { }
  
}
