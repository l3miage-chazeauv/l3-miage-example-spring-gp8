import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MiahootUser, Question } from '../QcmDefinitions';
import { GameService } from '../game.service';
import { APIService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '@angular/fire/auth';

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

  public idCourant:number = 1;
  private concepteurs?: MiahootUser[];
  private presentateurs?: MiahootUser[];

  public idPresentateur?: string;
  public idUserFB: string = "nullIdUserFB";
  
  constructor(private apiMia: APIService, 
              private router: Router, 
              private ar: ActivatedRoute,
              protected gs: GameService, 
              private ms: UserService,
              private cdRef: ChangeDetectorRef) { 

    this.assignUserId().then(() => {
      this.idMiahoot = this.ar.snapshot.params['id'];

      if(this.idMiahoot) {
        console.log("Id du miahoot: " + this.idMiahoot);
        this.assignPresentateur(this.idMiahoot).then(() => {

          this.apiMia.getAPIQuestionsByMiahootID(this.idMiahoot).subscribe((data: any) => {

            data.map((obj: { id: any, label: any, miahootId: any,reponses: any }) => {
              let question: Question = {
                label: obj.label, 
                reponses: obj.reponses,
                id: obj.id
              };
              this.gs.miahootGame.miahoot.listeQuestions.push(question);
            })
          }); // On récupère les questions du miahoot
    
          console.log("Présentateur: " + this.idPresentateur);
          console.log("User courant: " + this.idUserFB);
          });
      }
    });
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

  async assignPresentateur(idMiahoot: number) {
    this.idPresentateur = await this.gs.getPresentateurMiahootPresente(idMiahoot.toString());
  }

  async assignUserId(): Promise<void> {
    this.idUserFB = await this.ms.getIdUserFB();
  }

  
}