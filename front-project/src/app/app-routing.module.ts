import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MiahootComponent} from "./miahoot/miahoot.component";
import {RechercheMiaComponent} from "./recherche-mia/recherche-mia.component";
import {AccountConfigComponent} from "./account-config/account-config.component";
import { AppComponent } from './app.component';
import { QcmEditingComponent } from './qcm-editing/qcm-editing.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';

const routes: Routes = [
  {
    path:'',
  component: AppComponent
  }, {
  path:'accountConfig',
  component: AccountConfigComponent
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
  path: '**',
    component: AppComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
