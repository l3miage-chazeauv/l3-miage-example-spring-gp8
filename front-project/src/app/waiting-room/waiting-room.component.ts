import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MiahootUser } from '../miahoot.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingRoomComponent {

  utilisateurs: MiahootUser[] = [];
  timer: number = 0.5;

  constructor(private cdr: ChangeDetectorRef, private gs: GameService) {}

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.timer--;
      console.log(this.timer);
      if (this.timer < 0) {
        clearInterval(intervalId);
        this.gs.startGame();
      }
      this.cdr.markForCheck();
    }, 1000);
  }

}
