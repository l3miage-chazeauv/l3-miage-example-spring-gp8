import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private apiUrl = 'http://129.88.210.111:8080';

  constructor(private http: HttpClient) {}

  /* UTILISATEURS */
  postAPIUser(data:any): Observable<any> {
    const url = `${this.apiUrl}/utilisateur/`;
    const body = {
      "nom": data.username,
      "description": data.firebaseId
    };
    return this.http.post(url, body);
  }
  
  getAPIAllUsers(): Observable<any> {
    const url = `${this.apiUrl}/utilisateur/`;
    return this.http.get(url);
  }

  /* MIAHOOTS */
  getAPIAllMiahoots(): Observable<any> {
    const url = `${this.apiUrl}/miahoot/`;
    return this.http.get(url);
  }

  getAPIMiahootById(idMiahoot : number): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${idMiahoot}`;
    return this.http.get(url);
  }



  // Fonction pour la methode POST
  postAPIMiahoot(data: any): Observable<any> {
    const url = `${this.apiUrl}/miahoot/`;
    const headers = {'accept': '*/*',  
                     'Content-Type': 'application/json'};
    return this.http.post(url,  data, {headers});
  }

  

  // Fonction pour la methode DELETE des miahoots
  deleteAPIQMiahootById(id:number): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${id}`;
    return this.http.delete(url);
  }

  // Fonction pour la methode PATCH des miahoots
  patchAPIMiahootById(id:number, data:any): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${id}`;
    const body = {
      "nom": data.nom,
      "description": data.description
    };
    return this.http.patch(url, body);
  }
  /* QUESTIONS */
  // Fonction pour la methode GET des questions d'un miahoot donnee
  getAPIQuestionsByMiahootID(idMiahoot: number): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${idMiahoot}/questions`;
    return this.http.get(url);
  }

  // Fonction pour la methode DELETE des questions
  deleteAPIQuestionById(id:number): Observable<any> {
    const url = `${this.apiUrl}/question/${id}`;
    return this.http.delete(url);
  }

  // Fonction pour la methode POST
  postAPIQuestion(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post(url,[] );
  }

  /* REPONSES */
  // Fonction pour la methode GET
  getAPIReponses(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    return this.http.get(url);
  }

  // Fonction pour la methode POST
  postAPIReponse(endpoint: string, data :any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    
    return this.http.post(url,data);
  }
}
