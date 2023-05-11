import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { RoutingService } from '../routing.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(protected router : RoutingService,private auth: Auth, private pr : AppComponent){}

  async logout() {
    this.pr.logout();
  }
}
