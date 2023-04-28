import { Component } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {

  constructor(private apiMia: APIService) {}

  getMiahoot() {
    this.apiMia.getAPI('miahoot').subscribe((data: any) => {
    console.log(data);
    });
  }

}
