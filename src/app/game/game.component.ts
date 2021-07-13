import { Component, OnInit } from '@angular/core';
import { AnswerState } from '../answer/answer.component';
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
  answerState = {
    answer_1: AnswerState.Select,
    answer_2: AnswerState.Select,
    answer_3: AnswerState.Select,
    answer_4: AnswerState.Select
  }
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

    switch(this.question.answer) {
      case 1:
        this.answerState.answer_1 = AnswerState.Right;
        this.answerState.answer_2 = AnswerState.Wrong;
        this.answerState.answer_3 = AnswerState.Wrong;
        this.answerState.answer_4 = AnswerState.Wrong;
        break;
      case 2:
        this.answerState.answer_1 = AnswerState.Wrong;
        this.answerState.answer_2 = AnswerState.Right;
        this.answerState.answer_3 = AnswerState.Wrong;
        this.answerState.answer_4 = AnswerState.Wrong;
        break;
      case 3:
        this.answerState.answer_1 = AnswerState.Wrong;
        this.answerState.answer_2 = AnswerState.Wrong;
        this.answerState.answer_3 = AnswerState.Right;
        this.answerState.answer_4 = AnswerState.Wrong;
        break;
      case 4:
        this.answerState.answer_1 = AnswerState.Wrong;
        this.answerState.answer_2 = AnswerState.Wrong;
        this.answerState.answer_3 = AnswerState.Wrong;
        this.answerState.answer_4 = AnswerState.Right;
        break;
    }

    setTimeout(() => { // Wait 1 second  // TODO: to slow ...
      if (this.lives > 0) {
        this.answerState.answer_1 = AnswerState.Select;
        this.answerState.answer_2 = AnswerState.Select;
        this.answerState.answer_3 = AnswerState.Select;
        this.answerState.answer_4 = AnswerState.Select;
        this.question = this.backend.getRandomQuestion(this.difficulty)
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
