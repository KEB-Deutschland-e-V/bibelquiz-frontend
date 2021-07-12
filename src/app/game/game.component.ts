import { Component, OnInit } from '@angular/core';
import { BackendService, Difficulty, Question } from '../services/backend.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  state: GameState = GameState.Start;
  difficulties: Difficulty[] = [];
  difficulty: Difficulty;
  config = {
    countdown: 3,
    lives: 3
  }
  countdown;
  lives;
  questionNumber = 1;
  question: Question;
  constructor(private backend: BackendService) { 
    this.difficulties = this.backend.getDifficulties();
    this.difficulty = this.difficulties[0];
    this.countdown = this.config.countdown;
    this.lives = this.config.lives;
    this.question = this.backend.getRandomQuestion(this.difficulty); // TODO: utf-8 problem
  }

  ngOnInit(): void {
    
  }


  public setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
    this.state = GameState.Countdown;
    this.countdown = this.config.countdown;
    setInterval(() => {
      if (this.countdown > 1) {
        this.countdown--;
      } else {
        this.state = GameState.Game;
      }
    }, this.config.countdown * 1000);
  }
  public chooseAnswer(answer:number) {
    if (this.question.answer === answer) {
      this.questionNumber++
    } else {
      this.lives--;
    }
    this.backend.postStats(this.question, answer)

    // TODO: if OK: green
    // TODO: if FALSE: -1 live, red 

    setTimeout(() => { // Wait 1 second
      if (this.lives > 0) {
        this.question = this.backend.getRandomQuestion(this.difficulty)
        // TODO: remove colors
      } else {
        this.state = GameState.Highscore;
      }
    }, 1000)
  }
}
enum GameState {
  Start = 'Start',
  Countdown = 'Countdown',
  Game = 'Game',
  Highscore = 'Highscore'
}
