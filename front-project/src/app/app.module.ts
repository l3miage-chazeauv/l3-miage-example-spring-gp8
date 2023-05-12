
import { AppRoutingModule } from './app-routing.module';
import { NgModule,Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from "@angular/material/menu";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
// import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { MiahootComponent } from './miahoot/miahoot.component';
import { AccountConfigComponent } from './account-config/account-config.component';
import { QcmEditingComponent } from './qcm-editing/qcm-editing.component';
import { Reponse2Component } from './reponse/reponse.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { RechercheMiaComponent } from './recherche-mia/recherche-mia.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { PresentationsComponent } from './presentations/presentations.component';
import { MiahootEditingComponent } from './miahoot-editing/miahoot-editing.component';
import { CreateMiahootComponent } from './create-miahoot/create-miahoot.component';
import { ArchivePartiesComponent } from './archive-parties/archive-parties.component';
import { HomeComponent } from './home/home.component';
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    MiahootComponent,
    AccountConfigComponent,
    RechercheMiaComponent,
    WaitingRoomComponent,
    QcmEditingComponent,
    Reponse2Component,
    PresentationsComponent,
    MiahootEditingComponent,
    CreateMiahootComponent,
    ArchivePartiesComponent,
    HomeComponent,
    NewMiahootComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    // QRCodeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
