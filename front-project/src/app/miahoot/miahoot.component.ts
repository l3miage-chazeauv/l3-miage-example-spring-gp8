import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MiahootUser, Question } from '../QcmDefinitions';
import { GameService } from '../game.service';
import { APIService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, map, of } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-miahoot[idMiahoot]',
  templateUrl: './miahoot.component.html',
  styleUrls: ['./miahoot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MiahootComponent {

  @Input() idMiahoot!: number;

  public obsPartie$: Observable<any>;
  protected idQuestionCourante: number = 1;
  private concepteurs?: MiahootUser[];
  private presentateurs?: MiahootUser[];
  public voirRep: BehaviorSubject<boolean> = new BehaviorSubject(false);


  protected idPresentateur: string = "nullIdPresentateur";
  protected idUserFB: string = "nullIdUserFB";

  constructor(private apiMia: APIService,
    private router: Router,
    private ar: ActivatedRoute,
    protected gs: GameService,
    private ms: UserService,
    private cdRef: ChangeDetectorRef,
    private user: UserService) {

      this.idMiahoot = this.ar.snapshot.params['id'];
      
      this.gs.postIdQuestionCourante(this.idMiahoot, 1);

      this.obsPartie$ = this.gs.setObsPartie(this.idMiahoot.toString());

      this.obsPartie$.pipe(
        map(data => data[0].idQuestionCourante)
      ).subscribe((id) => {
        this.idQuestionCourante = id;
        this.cdRef.detectChanges();
      }); 

      this.gs.getPresentateurMiahootPresente(this.idMiahoot.toString()).then((id) => {
        this.idPresentateur = id;
        // this.cdr.detectChanges();
      });
  
      //On récupère l'id de l'utilisateur
      this.user.getIdUserFB().then((id) => {
        this.idUserFB = id;
        // this.cdr.detectChanges();
      });
      

    }
    

  ngOnDestroy(): void {
    this.gs.inGameFalse(this.idMiahoot);
    this.cdRef.detectChanges();
  }


  async ngOnInit(): Promise<void> {



    if (this.idMiahoot) {

    await this.assignPresentateur(this.idMiahoot).then(() => {

      this.apiMia.getAPIQuestionsByMiahootID(this.idMiahoot).subscribe((data: any) => {

        data.map((obj: { id: any, label: any, miahootId: any, reponses: any }) => {
          let question: Question = {
            label: obj.label,
            reponses: obj.reponses,
            id: obj.id
          };
          this.gs.miahootGame.miahoot.listeQuestions.push(question);
        })
      }); // On récupère les questions du miahoot
    }).catch((err) => {
      console.log("première erreur chef"+err);
    });
  }


  }

  async questionSuivante(): Promise<void> {
    // On passe à la question suivante
    ++this.idQuestionCourante;
    await this.gs.postIdQuestionCourante(this.idMiahoot, this.idQuestionCourante);
    this.cdRef.detectChanges();
  }

  async questionPrecedente(): Promise<void> {
    if (this.idQuestionCourante > 1) {
      // On passe à la question précédente
      --this.idQuestionCourante;
      await this.gs.postIdQuestionCourante(this.idMiahoot, this.idQuestionCourante);
      this.cdRef.detectChanges();
    }
  }

  async assignPresentateur(idMiahoot: number) {
    this.idPresentateur = await this.gs.getPresentateurMiahootPresente(idMiahoot.toString());
    this.cdRef.detectChanges();
  }

  async assignUserId(): Promise<void> {
    this.idUserFB = await this.ms.getIdUserFB();
    if (this.idUserFB == null) {
      this.idUserFB = "nullIdUserFB";
    }
    this.cdRef.detectChanges();
  }

  isPresenting(): boolean {
    // console.log("isPresenting: " + this.idUserFB + " == " + this.idPresentateur)
    return this.idUserFB == this.idPresentateur;
  }

  showBonneReponse(): void {
    if (this.voirRep.getValue() == true) {
      this.voirRep.next(false);
    } else if (this.voirRep.getValue() == false) {
      this.voirRep.next(true);
      
    }

  }

}