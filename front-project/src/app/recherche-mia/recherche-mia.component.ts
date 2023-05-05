import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { catchError, of } from 'rxjs';
import { APIService } from '../api.service';
import { RoutingService } from '../routing.service';
import { MiahootService } from '../miahoot.service';
import { MiahootGame } from '../QcmDefinitions';

@Component({
  selector: 'app-recherche-mia',
  templateUrl: './recherche-mia.component.html',
  styleUrls: ['./recherche-mia.component.css']
})
export class RechercheMiaComponent {

  public idRecherche? : number;
  public existe: boolean = true;

  constructor(private apiMia: APIService, protected rt: RoutingService, private ms: MiahootService ,private cdRef: ChangeDetectorRef) { }

  findMiahootByIdAndGo(): void {
    if (!(this.idRecherche === undefined || this.idRecherche === null)) 
      {
        this.apiMia.getAPIMiahootById(this.idRecherche).pipe(
          catchError(e => {
            console.log(e.status);
            this.existe = false;
            this.cdRef.detectChanges();
            return of();
          })
        ).subscribe((data: any) => {
          if(this.ms.listeMiahootPresentes.indexOf(data.id) > -1){
            
            this.rt.toMiahoot(this.idRecherche);
          } else{
            this.existe = false;
            this.cdRef.detectChanges();
          }
        })
      }

    }
  }
