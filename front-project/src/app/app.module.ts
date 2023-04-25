
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { ReponseComponent } from './reponse/reponse.component';
import { MiahootComponent } from './miahoot/miahoot.component';

@NgModule({
  declarations: [
    AppComponent,
    ReponseComponent,
    QuestionComponent,
    // ComponentQuestionComponent,
    // ComponentReponseComponent,
   
    MiahootComponent
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
