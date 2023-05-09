import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MiahootComponent} from "./miahoot/miahoot.component";
import {RechercheMiaComponent} from "./recherche-mia/recherche-mia.component";
import {AccountConfigComponent} from "./account-config/account-config.component";
import { AppComponent } from './app.component';
import { QcmEditingComponent } from './qcm-editing/qcm-editing.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { PresentationsComponent } from './presentations/presentations.component';
import { MiahootEditingComponent } from './miahoot-editing/miahoot-editing.component';
import { CreateMiahootComponent } from './create-miahoot/create-miahoot.component';
import { ArchivePartiesComponent } from './archive-parties/archive-parties.component';
import { HomeComponent } from './home/home.component';
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';

const routes: Routes = [
  {
    path:'',
  component: HomeComponent
  },{
    path:'miahoot-editing',
  component: MiahootEditingComponent
  },{
    path:'new-miahoot',
  component: NewMiahootComponent
  }, {
  path:'accountConfig',
  component: AccountConfigComponent
},{
  path:'create-miahoot/:id',
component: CreateMiahootComponent
}, {
  path:'miahootResearch',
  component: RechercheMiaComponent,
}, {
  path:'qcmEditing',
  component: QcmEditingComponent,
}, {
  path:'waitingRoom/:id',
  component: WaitingRoomComponent,
}, {
  path:'miahoot/:id',
  component: MiahootComponent,
}, {
  path:'presentations',
  component: PresentationsComponent,
}, {
  path:'archives',
  component: ArchivePartiesComponent,
}, {
  path: '**',
    component: AppComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
