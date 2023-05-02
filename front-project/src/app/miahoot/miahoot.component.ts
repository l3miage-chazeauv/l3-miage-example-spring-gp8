import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';
import { GameService } from '../game.service';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-miahoot[idMiahoot]',
  templateUrl: './miahoot.component.html',
  styleUrls: ['./miahoot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MiahootComponent{

  @Input() idMiahoot!:number;
<<<<<<< HEAD
  @Input() listeQuestions:Question[]=[{questionId:999,label: 'montre toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
                                                                                      {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]},
                                      {questionId:999,label: 'cache toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
                                                                                     {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]}];
=======
  // @Input() listeQuestions:Question[]=[{questionId:999,label: 'montre toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
  //                                                                                     {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]},
  //                                     {questionId:998,label: 'cache toi', reponses: [{reponseId:1, label: 'reponse 1', estCochee: false, estCorrecte: false},
  //                                                                                    {reponseId:2, label: 'reponse 2', estCochee: false, estCorrecte: true}]}];
>>>>>>> 211f5adeaa516b6f29b534a8a8f4b9ed77659166

  public idCourant:number = 0;;
  
  constructor(private apiMia: APIService, private router: Router, protected gs: GameService, private cdRef: ChangeDetectorRef) { 
    const state = this.router.getCurrentNavigation()?.extras.state; // On récupère les données de la route
    this.idMiahoot = state?.['idMiahootRouting'] ?? -1; // On récupère l'id du miahoot
    this.apiMia.getAPIMiahootByID('miahoot', this.idMiahoot).subscribe((data: any) => {
      this.gs.miahootGame.idMiahoot = data.idMiahoot;
      this.gs.miahootGame.listeQuestions = data.listeQuestions;
    }); // On récupère le miahoot

    this.gs.obsMiahootGame$.pipe(
      map(mg => {
        if(mg === undefined){
          this.gs.miahootGame.listeQuestions = [];
        } else {
          this.gs.miahootGame.listeQuestions = mg.listeQuestions;
        }
      })
    )
   }

  ngOnInit(): void {
<<<<<<< HEAD
    console.log("Initialisation: " + this.idMiahoot);
    this.apiMia.getAPI('question/'+this.idMiahoot).subscribe((data: any) => { // On récupère les questions
      this.listeQuestions=data;
    });
=======
    
>>>>>>> 211f5adeaa516b6f29b534a8a8f4b9ed77659166
  }
  
  questionSuivante():void{
    this.idCourant=this.idCourant+1; // On passe à la question suivante
    this.cdRef.detectChanges();
  }

  questionPrecedente():void{
    if(this.idCourant>0){
      this.idCourant=this.idCourant-1; // On passe à la question précédente
      this.cdRef.detectChanges();
    }
  }
}