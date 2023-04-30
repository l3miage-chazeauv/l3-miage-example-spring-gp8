import { Injectable } from '@angular/core';
import { Reponse } from './QcmDefinitions';

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
