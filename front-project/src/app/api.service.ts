import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private apiUrl = 'http://129.88.210.111:8080';

  constructor(private http: HttpClient) { }

  // Fonction pour la méthode GET
  getAPI(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    return this.http.get(url);
    
  }


//   curl -X 'POST' \
//   'http://129.88.210.111:8080/miahoot/' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "nom": "Test mathematiques",
//   "description": "Un test pour tous les ages"
// }'

    //Bon en gros ici j'ai essayé de faire un post avec un body,
    // mais ca renvoie une erreur 400
    //Donc c'est une erreur de formulation, genre la requête est good,
    //mais pas compréhensible par le serveur et nous renvoie ca
    //tout le mystère se trouve dans la formulation de la requête
    //Ce que tu vois au dessus de ce commentaire c'est ce que tu trouves sur swagger
    //Va voir c'est indispensable pour comprendre
    //Donc en gros je sais pas comment formuler la requête, l'odre

    //Important, regarde la partie "Reponse" de tous les POST sur swagger
    //ca donne une bonne idée de la gueule de la requête, et permet de comprendre beaucoup 
    //de chose sur la formulation de la requête (ma fait passé d'une erreur 500 à 400, 
    //c'est un bon début)
    //Courage si tu fais ca Lundi, tu devrais avoir toutes les infos que j'ai comprise vendredi 
  postAPIMiahoot(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    const headers = {'accept': '*/*',  'Content-Type': 'application/json'};
    return this.http.post(url,  data,{ headers} );
  }


  //Autre test
  postAPIQuestion(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    const headers = {'accept': '*/*'};
    return this.http.post(url,{ headers} );
  }
}
