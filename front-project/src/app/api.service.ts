import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private apiUrl = 'http://129.88.210.111:8080';

  constructor(private http: HttpClient) {

   }

  // Fonction pour la méthode GET
  getAPIMiahoots(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    return this.http.get(url);
    
  }

  // Fonction pour la méthode GET
  getAPIMiahootById(endpoint: string, idMiahoot : number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${idMiahoot}`;
    return this.http.get(url);
    
  }

  // Fonction pour la méthode GET
  getAPIQuestionsByMiahootID(idMiahoot: number): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${idMiahoot}/questions`;
    return this.http.get(url);
  }

  
  
  // Fonction pour la méthode POST
  postAPIMiahoot(endpoint: string, data: any): Observable<any> {
    
    const url = `${this.apiUrl}/${endpoint}/`;
    const headers = {'accept': '*/*',  
                     'Content-Type': 'application/json'};
    
    return this.http.post(url, data);
  }

  // Fonction pour la méthode POST
  postAPIQuestion(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    
    return this.http.post(url,[] );
  }


  // Fonction pour la méthode GET
  getAPIReponses(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    return this.http.get(url);
  }




  // Fonction pour la méthode POST
  postAPIReponse(endpoint: string, data :any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    
    return this.http.post(url,data);
  }


  // Fonction pour la méthode DELETE des questions 
  deleteAPIQuestionById(idQuestion :number): Observable<any> {
    const url = `${this.apiUrl}/question/${idQuestion}`;
    
    return this.http.delete(url);
  }
}
