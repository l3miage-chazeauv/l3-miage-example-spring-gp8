import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private apiUrl = 'http://129.88.210.142:8080';

  constructor(private http: HttpClient) { }

  // Fonction pour la méthode GET
  getAPI(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    return this.http.get(url);
    
  }

  // Fonction pour la méthode GET
  getAPIById(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  // Fonction pour la méthode POST
  postAPI(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, data, httpOptions);
  }

  getQuestions(miahootId: string): Observable<any> {
    const url = `${this.apiUrl}/miahoots/${miahootId}/questions`;
    return this.http.get(url);
  }
}
