import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ComponentQuestionComponent } from './component-question/component-question.component';
// import { ComponentReponseComponent } from './component-reponse/component-reponse.component';
import { ReponseComponent } from './reponse/reponse.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    // ComponentQuestionComponent,
    // ComponentReponseComponent,
    ReponseComponent,
    MatToolbarModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
