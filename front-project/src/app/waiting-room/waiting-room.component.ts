import { Component } from '@angular/core';
import { MiahootUser } from '../miahoot.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent {

  utilisateurs: MiahootUser[] = [];
  timer: number = 300; // 5 minutes en secondes

}
