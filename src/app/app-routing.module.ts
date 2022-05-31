import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { DataComponent } from './data/data.component';
import { GameComponent } from './game/game.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { LegalComponent } from './legal/legal.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'start', component: WelcomeComponent },
  { path: 'home', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'game', component: GameComponent },
  { path: 'spiel', component: GameComponent },
  { path: 'highscores', component: HighscoresComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'impressum', component: LegalComponent },
  { path: 'data', component: DataComponent },
  { path: 'datenschutz', component: DataComponent },
  { path: 'changelog', component: ChangelogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
