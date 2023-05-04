import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(protected router : RoutingService,private auth: Auth){}

  async logout() {
    await signOut(this.auth); // on se déconnecte
    this.router.toHome(); // on retourne à la page d'accueil
  }
}
