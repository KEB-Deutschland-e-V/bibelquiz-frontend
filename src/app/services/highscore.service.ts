import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Difficulty } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  constructor(private httpClient: HttpClient) { }

  public enterScore(data: Highscore) {
    return this.httpClient.post(environment.backend + '/highscore', {
      username: data.username,
      score: data.score,
      difficulty: data.difficulty
    });
  }
  public getHighscores(difficulty?: Difficulty) {
    if (difficulty) {
      return this.httpClient.get<Highscore[]>(environment.backend + '/highscores/' + difficulty.id)
    } else {
      return this.httpClient.get<Highscore[]>(environment.backend + '/highscores')
    } 
  }
}
export interface Highscore {
  username:string;
  score:string;
  difficulty: string;
}