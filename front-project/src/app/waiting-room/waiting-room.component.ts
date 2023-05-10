import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { GameService } from '../game.service';
import { MiahootUser } from '../QcmDefinitions';
import { MiahootComponent } from '../miahoot/miahoot.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingRoomComponent {

  nbUtilisateurs: number = 0;
  protected bsNbUserConnected: BehaviorSubject<number> = new BehaviorSubject(this.nbUtilisateurs);

  constructor(private cdr: ChangeDetectorRef, protected gs: GameService, private miahoot: MiahootComponent, private ar: ActivatedRoute,) {
    this.udpateNbUserConnected();
  }

  ngOnInit(): void {
    setInterval(() => {
      
      
      this.cdr.markForCheck();
    }, 1000);
  }

  async udpateNbUserConnected() {
    console.log(this.ar.snapshot.params[''])
    await this.gs.addConnectedUser(this.ar.snapshot.params['id']);
    await this.gs.getNumberOfUserConnected(parseInt(this.ar.snapshot.params['id'])).then((nbUserConnected) => {
      this.nbUtilisateurs = nbUserConnected;
       this.cdr.detectChanges();
    });
  }
}
