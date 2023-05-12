import { ChangeDetectorRef, Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RoutingService } from '../routing.service';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    protected disconnected!: boolean;

  constructor(protected router : RoutingService,private auth: Auth, private pr : AppComponent, private userS: UserService, private cdRef: ChangeDetectorRef){

    this.userS.obsMiahootUser$.subscribe(user =>{
        this.disconnected = user == undefined;
        console.log(this.disconnected);
        this.cdRef.detectChanges();

    })
  }

  async logout() {
    this.pr.logout();
  }
}
