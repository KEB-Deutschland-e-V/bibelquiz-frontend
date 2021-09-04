import { Component, OnInit } from '@angular/core';
import { BackendService, Difficulty } from '../services/backend.service';
import { Highscore, HighscoreService } from '../services/highscore.service';

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
    private highscoreService: HighscoreService
    ) {
    this.difficulties = this.backend.getDifficulties();
    this.highscoreService.getHighscores().subscribe((data: any) => {
      this.highscores = data;
      for (const dif of this.difficulties) {
        let filter = this.highscores.filter(x => x.difficulty === dif.id.toString())
        console.log(filter)
        filter.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))
        filter = filter.slice(0, 10)

        this.diffWithScores.push({
          difficulty: dif,
          scores: filter
        });
      }
    });
  }

  
  ngOnInit(): void {
  }

}
