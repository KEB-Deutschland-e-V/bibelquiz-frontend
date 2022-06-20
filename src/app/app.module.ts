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
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { AnswerComponent } from './answer/answer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
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
