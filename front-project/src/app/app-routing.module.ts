import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MiahootComponent} from "./miahoot/miahoot.component";
import {AccountConfigComponent} from "./account-config/account-config.component";
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'',
  component: AppComponent
  }, {
  path:'accountConfig',
  component: AccountConfigComponent
}, {
  path: '**',
    component: AppComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
