import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { catchError, of } from 'rxjs';
import { APIService } from '../api.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-recherche-mia',
  templateUrl: './recherche-mia.component.html',
  styleUrls: ['./recherche-mia.component.css']
})
export class RechercheMiaComponent {

  public idRecherche?: number;
  public existe: boolean = true;

  constructor(private apiMia: APIService, protected rt: RoutingService, private cdRef: ChangeDetectorRef) { }

  findMiahootByIdAndGo(): void {
    console.log(this.idRecherche)
    this.apiMia.getAPI('miahoot/' + this.idRecherche).pipe(
      catchError(e => {
        console.log(e.status);
        this.existe = false;
        this.cdRef.detectChanges();
        return of();
      })
    ).subscribe((data: any) => {
      console.log("appel de toMiahoot avec: " + this.idRecherche);
        this.rt.toMiahoot(this.idRecherche);
    })
  }
}
