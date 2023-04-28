import { Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';

@Component({
  selector: 'app-miahoot[idMiahoot]',
  templateUrl: './miahoot.component.html',
  styleUrls: ['./miahoot.component.css']
})

export class MiahootComponent{

  @Input() idMiahoot!:number;
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
}