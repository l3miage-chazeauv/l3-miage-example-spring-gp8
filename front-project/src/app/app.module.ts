
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
// import { ComponentQuestionComponent } from './component-question/component-question.component';
// import { ComponentReponseComponent } from './component-reponse/component-reponse.component';
import { ReponseComponent } from './reponse/reponse.component';

@NgModule({
  declarations: [
    AppComponent,
    // ComponentQuestionComponent,
    // ComponentReponseComponent,
    ReponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
