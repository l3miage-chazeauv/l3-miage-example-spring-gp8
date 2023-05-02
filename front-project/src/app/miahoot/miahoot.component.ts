import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Question } from '../QcmDefinitions';
import { GameService } from '../game.service';
import { APIService } from '../api.service';
import { Router } from '@angular/router';

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

  public idCourant:number = 0;;
  
  constructor(private apiMia: APIService, private router: Router, protected gs: GameService, private cdRef: ChangeDetectorRef) { 
    const state = this.router.getCurrentNavigation()?.extras.state; // On récupère les données de la route
    this.idMiahoot = state?.['idMiahootRouting'] ?? -1; // On récupère l'id du miahoot
   }

  ngOnInit(): void {
    this.apiMia.getMiahootByID('miahoot', this.idMiahoot).subscribe((data: any) => {
      this.gs.miahootGame.idMiahoot = data.idMiahoot;
      this.gs.miahootGame.listeQuestions = data.listeQuestions;
    }); // On récupère le miahoot
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