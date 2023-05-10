import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { GameService } from '../game.service';
import { MiahootUser } from '../QcmDefinitions';
import { MiahootComponent } from '../miahoot/miahoot.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingRoomComponent {

  nbUtilisateurs: number = 0;
  timer: number = 300;

  constructor(private cdr: ChangeDetectorRef, protected gs: GameService, private miahoot: MiahootComponent, private ar: ActivatedRoute,) {}

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.timer--;
      if (this.timer < 0) {
        clearInterval(intervalId);
        this.gs.startGame();
      }
      this.cdr.markForCheck();
    }, 1000);

    this.gs.getNumberOfUserConnected(parseInt(this.ar.snapshot.params['id'])).then((nbUserConnected) => {
      this.nbUtilisateurs = nbUserConnected;

    })
    

  }


}
