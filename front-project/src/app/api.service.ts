import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { MiahootService } from './miahoot.service';
import { Question } from './QcmDefinitions';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private apiUrl = 'http://129.88.210.111:8080';

  constructor(private http: HttpClient, private ms: MiahootService) {}

  /* UTILISATEURS */
  postAPIUser(data:any): Observable<any> {
    const url = `${this.apiUrl}/utilisateur/`; // On crée un utilisateur
    return this.http.post(url, data);
  }
  
  getAPIAllUsers(): Observable<any> {
    const url = `${this.apiUrl}/utilisateur/`; // On récupère tous les utilisateurs
    return this.http.get(url);
  }

  getAPIUserById(idUser : string): Observable<any> {
    const url = `${this.apiUrl}/utilisateur/${idUser}`; // On récupère un utilisateur par son id
    return this.http.get(url);
  }

  getAPIPresentateurs(miahootId: number): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${miahootId}/presentateurs`; // On récupère les présentateurs d'un miahoot
    return this.http.get(url);
  }

  deleteAPIUserById(id:number): Observable<any> {
    const url = `${this.apiUrl}/utilisateur/${id}`; // On supprime un utilisateur par son id
    return this.http.delete(url);
  }

  patchAPIUserById(id:number, data:any): Observable<any> {
    const url = `${this.apiUrl}/utilisateur/${id}`; //  On modifie un utilisateur par son id
    return this.http.patch(url, data);
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

  getAPIMmiahootsPresented(idFb: string){
    const url = `${this.apiUrl}/utilisateur/${idFb}/miahootsPresentes`;
    return this.http.get(url);
  }

  // Fonction pour la methode POST
  postAPIMiahoot(data: any): Observable<any> {
    //this.ms.listeMiahoots.push(data); // On ajoute le miahoot a la liste des miahoots
    const url = `${this.apiUrl}/miahoot/`;
    return this.http.post(url, data);
  }

  // Fonction pour la methode DELETE des miahoots
  deleteAPIQMiahootById(id:number): Observable<any> {
    //this.ms.listeMiahoots.splice(this.ms.listeMiahoots.indexOf(id),1); // On supprime le miahoot de la liste des miahoots
    const url = `${this.apiUrl}/miahoot/${id}`;
    return this.http.delete(url);
  }

  // Fonction pour la methode PATCH des miahoots
  patchAPIMiahootById(id:number, data:any): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${id}`;
    return this.http.patch(url, data);
  }
  /* QUESTIONS */
  // Fonction pour la methode GET des questions d'un miahoot donnee
  getAPIQuestionsByMiahootID(idMiahoot: number): Observable<any> {
    const url = `${this.apiUrl}/miahoot/${idMiahoot}/questions`;
    return this.http.get(url);
  }

  getAPIQuestionsByMiahootIDPr(idMiahoot: number): Promise<Question[]> {
    const url = `${this.apiUrl}/miahoot/${idMiahoot}/questions`;
    const observable = this.http.get(url);
    return firstValueFrom(observable).then(
      (data) => {
        return data as Question[];
      }
    );
  }

  getAPIAllQuestions(): Observable<any> {
    const url = `${this.apiUrl}/question/`;
    return this.http.get(url);
  }

  getAPIQuestionByMiahootID(idQuestion: number): Observable<any> {
    const url = `${this.apiUrl}/question/${idQuestion}`;
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

  patchAPIQuestionById(id:number, data:any): Observable<any> {
    const url = `${this.apiUrl}/question/${id}`;
    return this.http.patch(url, data);
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

  // Fonction pour la methode DELETE des questions
  deleteAPIReponseById(id:number): Observable<any> {
    const url = `${this.apiUrl}/reponse/${id}`;
    return this.http.delete(url);
  }

  patchAPIReponseById(id:number, data:any): Observable<any> {
    const url = `${this.apiUrl}/reponse/${id}`;
    return this.http.patch(url, data);
  }
}
