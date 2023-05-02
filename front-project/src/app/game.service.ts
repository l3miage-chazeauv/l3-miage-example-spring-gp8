import { Injectable } from '@angular/core';
import { Question, Reponse, miahootGame } from './QcmDefinitions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService{

  inGame: boolean = false;
  miahootGame: miahootGame = {idMiahoot: -1, listeQuestions: []};
  obsMiahootGame$ = new Observable<miahootGame | undefined>;

  constructor() { }

  startGame(): void {
    this.inGame = true;
  }

}
