import { Component } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-qcm-editing',
  templateUrl: './qcm-editing.component.html',
  styleUrls: ['./qcm-editing.component.css']
})
export class QcmEditingComponent {

  constructor(private api: APIService) {}

  getMiahoot() {
    this.api.getAPI('miahoot').subscribe((data: any) => {
    console.log(data);
    });
  }

}
