import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameService } from '../game.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-reponse2',
  templateUrl: './reponse2.component.html',
  styleUrls: ['./reponse2.component.css']
})
export class Reponse2Component {

  // @Input() reponse: Reponse = {reponseId:1, label: '', estCochee: false, estCorrecte: false};
  @Input() reponseId!: number
  @Input() label!: String
  @Input() estCorrecte!: Boolean
  @Input() idPresentateur?: string

  @Output() estCocheeChange = new EventEmitter<Boolean>();


  public estCochee: Boolean = false;
  public idUserFB: string = "nullIdUserFB";

  constructor(private ms: UserService, private cdRef: ChangeDetectorRef) {
  }

  async ngOnInit(): Promise<void> {
    await this.ms.getUser().then((user) => {
      if (user) {
        this.idUserFB = user.uid;
        this.cdRef.detectChanges();
      }
    });

    // console.log("idUserFB reponse2: " + this.idUserFB);
    // console.log("idPresentateur reponse2: " + this.idPresentateur);
  }

  toggleEstCochee() {
    this.estCochee = !this.estCochee;
    this.estCocheeChange.emit(this.estCochee);
  }

}
