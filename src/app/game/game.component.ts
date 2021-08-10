import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AnswerState } from '../answer/answer.component';
import { BackendService, Difficulty, Question } from '../services/backend.service';

import { environment } from './../../environments/environment';

import * as confetti from 'canvas-confetti';
import { SoundService } from '../services/sound.service';
import { ActivatedRoute } from '@angular/router';


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
  questionNumber = 0;
  question: Question;
  answerState = {
    answer_1: AnswerState.Select,
    answer_2: AnswerState.Select,
    answer_3: AnswerState.Select,
    answer_4: AnswerState.Select
  }
  showResult = false;
  result = {
    state: 'right',
    text: ''
  };
  myConfetti: any;
  canvas: any;
  saveName: boolean = false;
  name: string = '';
  constructor(
    private backend: BackendService, 
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private sounds: SoundService,
    private route: ActivatedRoute
    ) { 
    this.difficulties = this.backend.getDifficulties();
    this.difficulty = this.difficulties[0];
    this.countdown = this.config.countdown;
    this.lives = this.config.lives;
    this.question = this.backend.getRandomQuestion(this.difficulty);
    // TODO: load string from LocalStorage if there

    if(!environment.production) {
      this.route.queryParams.subscribe(params => {
        if (params['state']) {
          let desiredState = params['state'];
          switch(desiredState) {
            case 'Countdown':
              this.state = GameState.Countdown;
              break;
            case 'Again':
              this.state = GameState.Again;
              break;
            case 'Highscore':
              this.state = GameState.Highscore;
              break;
            case 'Game':
              this.state = GameState.Game;
              break;
            default:
              this.state = GameState.Start;
              break;
          }
        }
        
    });
    }
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
    if (this.showResult) {
      return;
    }
    this.showResult = true;
    if (this.question.answer === answer) {
      this.questionNumber++
      this.result.state = 'right';
      this.result.text = 'Richtig!'
      this.sounds.correct();
      this.surprise();
    } else {
      this.result.state = 'wrong';
      this.result.text = 'Leider Falsch!'
      this.sounds.wrong();
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

    setTimeout(() => { // Wait 2 seconds
      if (this.lives > 0) {
        this.showResult = false;
        if (this.canvas) {
          this.myConfetti.reset();
          this.renderer2.removeChild(this.elementRef.nativeElement, this.canvas)
        }
        this.answerState.answer_1 = AnswerState.Select;
        this.answerState.answer_2 = AnswerState.Select;
        this.answerState.answer_3 = AnswerState.Select;
        this.answerState.answer_4 = AnswerState.Select;
        this.question = this.backend.getRandomQuestion(this.difficulty)
      } else {
        this.result.text = 'Game Over ...'
        setTimeout(()=> {
          this.showResult = false;
          this.state = GameState.Highscore;
        }, 1000)
      }
    }, 2000)
  }
  public surprise(): void {
    this.canvas = this.renderer2.createElement('canvas');
    this.renderer2.addClass(this.canvas, 'top');
    this.renderer2.appendChild(this.elementRef.nativeElement, this.canvas);
  
    this.myConfetti = confetti.create(this.canvas, {
        resize: true // will fit all screen sizes
      });

      this.myConfetti({
      particleCount: 100,
      spread: 60,
      origin: {
        y: 1,
        x: 0.5
      },
      zIndex: 200
      // any other options from the global
      // confetti function
    });
  }

  public inputHighscore(): void {
    // TODO: design input and checkbox
    // TODO: read name
    // TODO: if checkbox is true -> save name and saveName to localhost
    // TODO: backend post Highscore
    // TODO: set state to Again
  }
  public doNotInputHighscore(): void {
    this.state = GameState.Again;
  }
  public playAgain(): void {
    this.questionNumber = 0;
    this.countdown = this.config.countdown;
    this.lives = this.config.lives;
    this.question = this.backend.getRandomQuestion(this.difficulty);
    this.setDifficulty(this.difficulty);
  }
}
enum GameState {
  Start = 'Start',
  Countdown = 'Countdown',
  Game = 'Game',
  Highscore = 'Highscore',
  Again = 'Again'
}
