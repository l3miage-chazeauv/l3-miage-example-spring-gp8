import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { GameService } from '../game.service';
import { MiahootUser } from '../QcmDefinitions';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingRoomComponent {

  utilisateurs: MiahootUser[] = [];
  timer: number = 300;

  constructor(private cdr: ChangeDetectorRef, protected gs: GameService) {}

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.timer--;
      if (this.timer < 0) {
        clearInterval(intervalId);
        this.gs.startGame();
      }
      this.cdr.markForCheck();
    }, 1000);
  }

}
