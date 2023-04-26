import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MiahootComponent} from "./miahoot/miahoot.component";
import {AccountConfigComponent} from "./account-config/account-config.component";

const routes: Routes = [
  {
    path:'',
  component:MiahootComponent
  }, {
  path:'accountConfig',
  component: AccountConfigComponent
}, {
  path: '**',
    component: MiahootComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
