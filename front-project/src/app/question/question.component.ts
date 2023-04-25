import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

interface Response {
  label: string[];
  estValide: Boolean;  
}


export class QuestionComponent {

  private label:String="question de base"
  private reponses:Reponse[]<Reponse>;

}
