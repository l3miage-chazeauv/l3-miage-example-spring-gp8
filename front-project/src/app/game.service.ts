import { Injectable } from '@angular/core';
import { Question, Reponse, miahootGame } from './QcmDefinitions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService{

  
  inGame: boolean = false;
  miahootGame: miahootGame = {isPresented: false, idMiahoot: -1, listeQuestions: []};

  obsMiahootGame$ = new Observable<miahootGame | undefined>;

  constructor() { }

  letsGoParty(miahootGame: miahootGame): void { // On initialise le jeu (fonction utilisable par un présentateur/concepteur)
    miahootGame.isPresented = true;
  }

  startGame(): void {
    this.inGame = true;
  }

}
