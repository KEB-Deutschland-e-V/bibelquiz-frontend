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
  loading: boolean = true;
  name: string = '';
  filter: String = 'week';
  filterName: String = 'der Woche';
  onlyMyScores: boolean = false;
  constructor(
    private backend: BackendService,
    private highscoreService: HighscoreService,
    private bgm: BgmService
    ) {
    this.loadHighscores(this.filter);
  }

  loadHighscores(filter: String) {
    this.loading = true;
    this.name = localStorage.getItem("name") || ''
    this.difficulties = this.backend.getDifficulties();
    this.highscoreService.getHighscores().subscribe((data: any) => {
      this.highscores = data;
      if (filter !== 'all') {
        this.highscores = this.filterHighscoresByDate(this.highscores, filter);
      }
      this.highscores.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))
      this.loading = false;
      console.log(this.highscores)
    });
  }
  
  showOnlyMyScores() {
    this.onlyMyScores = !this.onlyMyScores;
    if (this.onlyMyScores) {
      this.highscores = this.highscores.filter(score => score.username === this.name);
    } else {
      this.loadHighscores(this.filter);
    }
  }

  ngOnInit(): void {
    this.bgm.theme();
  }

  setFilter(value: String) {
    this.filter = value;
    switch (value) {
      case 'week':
        this.filterName = 'der Woche';
        break;
      case 'month':
        this.filterName = 'des Monats';
        break;
      case 'year':
        this.filterName = 'des Jahres';
        break;
      case 'all':
        this.filterName = 'über alle Zeiten';
        break;
      default:
        this.filterName = 'ERROR';
        break;
    }
    this.loadHighscores(this.filter);
  }
  filterHighscoresByDate(highscores: Highscore[], filterBy: String) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = this.getCalendarWeek(currentDate);
  
    return highscores.filter((score) => {
      const scoreDate = score.date ? new Date(score.date) : new Date();
      const scoreYear = scoreDate.getFullYear();
      const scoreMonth = scoreDate.getMonth();
      const scoreWeek = this.getCalendarWeek(scoreDate);
  
      if (filterBy === 'year') {
        return scoreYear === currentYear;
      } else if (filterBy === 'month') {
        return scoreYear === currentYear && scoreMonth === currentMonth;
      } else if (filterBy === 'week') {
        return scoreYear === currentYear && scoreWeek === currentWeek;
      } else {
        return false;
      }
    });
  }
  
  getCalendarWeek(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((+d - +week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
}
