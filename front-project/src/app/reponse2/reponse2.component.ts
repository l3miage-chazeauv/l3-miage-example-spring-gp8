import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameService } from '../game.service';
import { UserService } from '../user.service';
import { MiahootComponent } from '../miahoot/miahoot.component';
import { Subscription } from 'rxjs/internal/Subscription';


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
  protected voirRep: boolean = false;

  @Output() estCocheeChange = new EventEmitter<Boolean>();


  public estCochee: Boolean = false;
  public idUserFB: string = "nullIdUserFB";


  constructor(private ms:UserService, private cdRef: ChangeDetectorRef, private miahoot : MiahootComponent) {
    

  }

async ngOnInit(): Promise<void> {

   this.miahoot.voirRep.subscribe((value) => {
    this.voirRep = value; // Attribue la valeur reçue à la variable
    this.cdRef.detectChanges();
  });

  await this.ms.getUser().then((user) => {
    if (user) {
      this.idUserFB = user.uid;
      this.cdRef.detectChanges();
    }
  });

}

toggleEstCochee() {
  console.log("toggleEstCochee REPONSE");
  this.estCochee = !this.estCochee;
  this.estCocheeChange.emit(this.estCochee);
}

}