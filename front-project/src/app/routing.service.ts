import { Injectable } from '@angular/core';
import { indexedDBLocalPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RoutingService{

  constructor(private router: Router) {}

  toAccountConfig(){
    this.router.navigateByUrl("accountConfig"); // on redirige vers la page de configuration du compte
  }

  toMiahootResearch(){
    this.router.navigateByUrl("miahootResearch"); // on redirige vers la page de recherche de miahoot
  }

  toHome(){
    this.router.navigateByUrl(""); // on redirige vers la page d'accueil
  }

  toEditing(){
    this.router.navigateByUrl("qcmEditing"); // on redirige vers la page d'édition de qcm
  }

  toWaitingRoom(id: number | undefined){
    this.router.navigateByUrl("waitingRoom/"+id, { state: { idWRRouting: id } }); // on redirige vers la page de salle d'attente
  }

  toMiahoot(id:number | undefined){
    console.log("routing vers miahoot...");
    this.router.navigateByUrl("miahoot/"+id, { state: { idMiahootRouting: id } }); // on redirige vers la page de miahoot 
    console.log("routing réalisé avec succès");
  }
}