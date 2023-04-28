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

    // Fonction pour la méthode POST
  postAPIMiahoot(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/`;
    const body = { nom: 'data.nameMia', description: 'data.descriptionMia'};
    const httpOptions = {
      headers: new HttpHeaders({
        'nom': data.nameMia,
        'description': data.descriptionMia
      })
    };
    return this.http.post<any>(url, body);
  }
}
