import { Component, OnInit } from '@angular/core';
import { BackendService, Difficulty } from '../services/backend.service';
import { Highscore, HighscoreService } from '../services/highscore.service';
import { BgmService } from '../services/bgm.service';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.scss']
})
export class HighscoresComponent implements OnInit {

  difficulties: Difficulty[] = [];
  highscores: Highscore[] = [];
  diffWithScores: any = [];
  constructor(
    private backend: BackendService,
    private highscoreService: HighscoreService,
    private bgm: BgmService
    ) {
    this.difficulties = this.backend.getDifficulties();
    this.highscoreService.getHighscores().subscribe((data: any) => {
      this.highscores = data;
      this.highscores.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))
      console.log(this.highscores)
    });
  }

  
  ngOnInit(): void {
    this.bgm.theme();
  }

}
