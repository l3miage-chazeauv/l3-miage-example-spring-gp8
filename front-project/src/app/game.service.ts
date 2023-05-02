import { Injectable } from '@angular/core';
import { Question, Reponse } from './QcmDefinitions';

interface miahootGame {
  idMiahoot: number;
  listeQuestions: Question[];
}

@Injectable({
  providedIn: 'root'
})

export class GameService{

  inGame: boolean = false;

  constructor() { }

  startGame(): void {
    this.inGame = true;
  }

}
