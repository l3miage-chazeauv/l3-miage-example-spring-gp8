import { Injectable } from '@angular/core';
import { Question, Reponse, miahootGame } from './QcmDefinitions';

@Injectable({
  providedIn: 'root'
})

export class GameService{

  inGame: boolean = false;
  miahootGame: miahootGame = {idMiahoot: -1, listeQuestions: []};

  constructor() { }

  startGame(): void {
    this.inGame = true;
  }

}
