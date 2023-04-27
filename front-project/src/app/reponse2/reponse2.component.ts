import { Component, Input } from '@angular/core';

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
  
    public estCochee:Boolean = false;
}
