import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LegalComponent } from './legal/legal.component';
import { DataComponent } from './data/data.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { GameComponent } from './game/game.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BackendService } from './services/backend.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';


import { AnswerComponent } from './answer/answer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ChangelogComponent } from './changelog/changelog.component';
import { AboutComponent } from './about/about.component';
import { PluralPipe } from './plural.pipe';



export function preloadQuestions(backendService: BackendService): Function {
  return () => backendService.init(); 
}


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LegalComponent,
    DataComponent,
    HighscoresComponent,
    GameComponent,
    AnswerComponent,
    ChangelogComponent,
    AboutComponent,
    PluralPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    BackendService,
    {
      provide: APP_INITIALIZER,
      useFactory: preloadQuestions,
      deps: [ BackendService],
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
