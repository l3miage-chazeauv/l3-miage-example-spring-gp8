import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentQuestionComponent } from './component-question/component-question.component';
import { ComponentReponseComponent } from './component-reponse/component-reponse.component';
import { ReponseComponent } from './reponse/reponse.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentQuestionComponent,
    ComponentReponseComponent,
    ReponseComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
