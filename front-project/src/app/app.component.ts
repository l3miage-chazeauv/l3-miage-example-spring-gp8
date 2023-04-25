import { Component } from '@angular/core';
import { Question } from './QcmDefinitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Miahoot';

  data: Question = {
    label: 'Quelle est la couleur du cheval blanc d\'Henri IV ?',
    reponses: [
      { label: 'Blanc', estValide: true },
      { label: 'Rouge', estValide: false },
      { label: 'Vert', estValide: false },
      { label: 'Bleu', estValide: false }
    ]
  }
}


