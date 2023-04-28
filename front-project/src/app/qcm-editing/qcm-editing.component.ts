import { Component } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {
  
  public idQuestion?:number;
  public idReponse?:number;

  public nameMia?:string;
  public descriptionMia?:string;

  constructor(private apiMia: APIService) {}

  getMiahoot(){
    this.apiMia.getAPI('miahoot').subscribe((data: any) => {
    console.log(data);
    });
  }

  postMiahoot(){
    this.apiMia.postAPIMiahoot('miahoot', [this.nameMia, this.descriptionMia])
    this.getMiahoot();
  }
  
  getQuestions(){
    this.apiMia.getAPI('question/'+this.idQuestion).subscribe((data: any) => {
    console.log(data);
    });
  }

  getReponses(){
    this.apiMia.getAPI('reponse/').subscribe((data: any) => {
    console.log(data);
    });
  }

}
