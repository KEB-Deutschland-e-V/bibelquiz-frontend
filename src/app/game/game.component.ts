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
  countdownInterval: any;
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
    this.countdownInterval = setInterval(() => {
      this.count();
    }, 1000);
  }
  private count() {
    console.log(new Date().toLocaleTimeString() + ': ' + this.countdown);
    if (this.countdown > 1) {
      this.countdown--;
    } else {
      clearInterval(this.countdownInterval);
      this.state = GameState.Game;
    }
  }
  public chooseAnswer(answer:number) {
    if (this.question.answer === answer) {
      this.questionNumber++
      // TODO: https://weuselibs.wordpress.com/2021/02/09/you-should-add-%F0%9F%8E%89-canvas-confetti-%F0%9F%8E%89-to-your-angular-project/
    } else {
      this.lives--;
    }
    this.backend.postStats(this.question, answer)

    // TODO: if OK: green
    // TODO: if FALSE: -1 live, red 

    setTimeout(() => { // Wait 1 second  // TODO: to slow ...
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
