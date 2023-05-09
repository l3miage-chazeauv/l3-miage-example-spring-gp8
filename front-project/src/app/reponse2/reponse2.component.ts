import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';
import { MiahootService } from '../miahoot.service';

@Component({
  selector: 'app-reponse2',
  templateUrl: './reponse2.component.html',
  styleUrls: ['./reponse2.component.css']
})
export class Reponse2Component {

    // @Input() reponse: Reponse = {reponseId:1, label: '', estCochee: false, estCorrecte: false};
    @Input() reponseId!: number 
    @Input() label!:String 
    @Input() estCorrecte!:Boolean
    @Input() idPresentateur?: string
  
    public estCochee:Boolean = false;
    public idUserFB: string = "nullIdUserFB";

    constructor(private ms: MiahootService) {
      this.ms.getUser().then((user) => {
        if(user) {
          this.idUserFB = user.uid;
        }
      })
     }
}
