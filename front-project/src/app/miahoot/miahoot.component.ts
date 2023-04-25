import { Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';

@Component({
  selector: 'app-miahoot',
  templateUrl: './miahoot.component.html',
  styleUrls: ['./miahoot.component.css']
})


export class MiahootComponent {

  @Input() listeQuestions:Question[]=[{ label: 'test', reponses: []}];

}
