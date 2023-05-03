import { Injectable } from '@angular/core';
import { Question, Reponse, MiahootGame } from './QcmDefinitions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService{

  
  inGame: boolean = false;
  miahootGame: MiahootGame = {isPresented: false, miahoot: {idMiahoot: 0, listeQuestions: []}};

  obsMiahootGame$ = new Observable<MiahootGame | undefined>;

  constructor() { }

  letsGoParty(miahootGame: MiahootGame): void { // On initialise le jeu (fonction utilisable par un présentateur/concepteur)
    miahootGame.isPresented = true;
  }

  startGame(): void {
    this.inGame = true;
  }

}
