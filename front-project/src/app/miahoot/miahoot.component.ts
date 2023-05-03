import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';
import { GameService } from '../game.service';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { MiahootUser } from '../miahoot.service';

@Component({
  selector: 'app-miahoot[idMiahoot]',
  templateUrl: './miahoot.component.html',
  styleUrls: ['./miahoot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MiahootComponent{

  @Input() idMiahoot!:number;
  // @Input() listeQuestions:Question[]=[{questionId:999,label: 'montre toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
  //                                                                                     {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]},
  //                                     {questionId:998,label: 'cache toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
  //                                                                                    {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]}];

  public idCourant:number = 0; // On initialise l'id courant à 0

  private concepteurs: MiahootUser[]
  
  constructor(private apiMia: APIService, private router: Router, protected gs: GameService, private cdRef: ChangeDetectorRef) { 

    const state = this.router.getCurrentNavigation()?.extras.state; // On récupère les données de la route
    this.idMiahoot = state?.['idMiahootRouting'] ?? -1; // On récupère l'id du miahoot

    this.apiMia.getAPIQuestionsByMiahootID(this.idMiahoot).subscribe((data: any) => {
      console.log("Data: " + JSON.stringify(data));
      data.map((obj: { id: any, label: any, miahootId: any,reponses: any }) => {
        let question: Question = {
          label: obj.label, 
          reponses: obj.reponses,
          questionId: obj.id
        };
        this.gs.miahootGame.listeQuestions.push(question);
      })

      // console.log("Liste des questions: " + this.gs.miahootGame.listeQuestions);
      // console.log("Question 1: " + JSON.stringify(this.gs.miahootGame.listeQuestions[0]));
      // console.log("Question 1 no string: " + this.gs.miahootGame.listeQuestions[0].label);
      
    }); // On récupère les questions du miahoot
   }
  
  questionSuivante():void{
    this.idCourant=this.idCourant+1; // On passe à la question suivante
    this.cdRef.detectChanges();
    console.log(this.idCourant);
  }

  questionPrecedente():void{
    if(this.idCourant>0){
      this.idCourant=this.idCourant-1; // On passe à la question précédente
      this.cdRef.detectChanges();
      console.log(this.idCourant);
    }
  }
}