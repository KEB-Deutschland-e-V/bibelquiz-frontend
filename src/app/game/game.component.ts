import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AnswerState } from '../answer/answer.component';
import { FormsModule } from '@angular/forms'
import { BackendService, Difficulty, Question } from '../services/backend.service';
import { HighscoreService, Highscore } from '../services/highscore.service';

import { environment } from './../../environments/environment';

import * as confetti from 'canvas-confetti';
import { SoundService } from '../services/sound.service';
import { TtsService } from '../services/tts.service';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../services/settings.service';


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
  points = 0;
  pointsForQuestion = 10; // max points per Question
  maxPointsPerQuestion = 10;
  pointLossTime = 1500;
  pointsInterval: any;
  countdown;
  countdownInterval: any;
  lives;
  questionNumber = 0;
  question: Question;
  usedQuestions: string[] = []; //ids of questions that have been used in this round
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
  entry = false;
  constructor(
    private backend: BackendService, 
    private highscoreService: HighscoreService,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private sounds: SoundService,
    private tts: TtsService,
    private route: ActivatedRoute,
    private settings: SettingsService
    ) { 
    this.difficulties = this.backend.getDifficulties();
    this.difficulty = this.difficulties[0];
    this.countdown = this.config.countdown;
    this.lives = this.config.lives;
    this.question = this.backend.getRandomQuestion(this.difficulty);
    this.pointsForQuestion = this.difficulty.points;
    this.usedQuestions.push(this.question.id);
    this.name = localStorage.getItem("name") || ''

    if(!environment.production) {
      this.route.queryParams.subscribe(params => {
        if (params['points']) {
          this.points = params['points'];
        }
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
    if (environment.flags.countdown) {
      this.countdownInterval = setInterval(() => {
        this.count();
      }, 1000);
    } else {
      this.state = GameState.Game;
      this.readQuestion(this.question)
      this.pointsInterval = setInterval(() => {
        if(this.pointsForQuestion > 1) {
          this.pointsForQuestion--;
        }
      }, this.pointLossTime);
    }
    
  }
  private count() {
    console.log(new Date().toLocaleTimeString() + ': ' + this.countdown);
    if (this.countdown > 1) {
      this.countdown--;
    } else {
      clearInterval(this.countdownInterval);
      this.state = GameState.Game;
      this.readQuestion(this.question)
      this.pointsInterval = setInterval(() => {
        if(this.pointsForQuestion > 1) {
          this.pointsForQuestion--;
        }
      }, this.pointLossTime);
    }
  }
  public chooseAnswer(answer:number) {
    if (this.showResult) {
      return;
    }
    clearInterval(this.pointsInterval);
    this.showResult = true;
    if (this.question.answer === answer) {
      this.questionNumber++
      this.points += this.pointsForQuestion;
      this.result.state = 'right';
      this.result.text = 'Richtig!'
      this.sounds.correct();
      this.tts.stop();
      this.tts.say(this.result.text);
      this.surprise();
    } else {
      this.result.state = 'wrong';
      this.result.text = 'Leider Falsch!'
      this.sounds.wrong();
      this.tts.stop();
      this.tts.say(this.result.text + ' Richtig wäre gewesen: ' + this.getAnswer(this.question));
      this.lives--;
    }
    this.backend.postStats(this.question, answer, this.result.state === 'right').subscribe();

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

    // TODO: remove this!
    setTimeout(() => { // Wait 4 seconds
      if (this.lives > 0) { // TODO: this part should be called on answer
        
      } else {
        this.result.text = 'Spielende'
        setTimeout(()=> {
          this.showResult = false;
          this.state = GameState.Highscore;
        }, 1000)
      }
    }, 4000)
  }
  public nextQuestion() {
    this.showResult = false;
    if (this.canvas) {
      this.myConfetti.reset();
      this.renderer2.removeChild(this.elementRef.nativeElement, this.canvas)
    }
    this.answerState.answer_1 = AnswerState.Select;
    this.answerState.answer_2 = AnswerState.Select;
    this.answerState.answer_3 = AnswerState.Select;
    this.answerState.answer_4 = AnswerState.Select;
    this.question = this.backend.getRandomQuestion(this.difficulty, this.usedQuestions)
    // TODO: if no questions are left:
    // TODO: get higher difficulty, show beforehand
    // TODO: if no higher difficulty is available: Game Over
    this.usedQuestions.push(this.question.id);
    this.pointsForQuestion = this.difficulty.points;
    this.readQuestion(this.question)
    this.pointsInterval = setInterval(() => {
      if(this.pointsForQuestion > 1) {
        this.pointsForQuestion--;
      }
    }, this.pointLossTime);
  }
  public surprise(): void {
    if (this.settings.getAnimations()) {
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
    
  }

  public inputHighscore(): void {
    localStorage.setItem("name", this.name)
    this.highscoreService.enterScore({
      username: this.name,
      score: this.points.toString(),
      difficulty: this.difficulty.id
    }).subscribe(result => {
      console.log('score entered')
      this.entry = true;
      this.state = GameState.Again; 
    });
  }
  public doNotInputHighscore(): void {
  
    this.entry = false;
    this.state = GameState.Again; 
  }

 
  private readQuestion(question: Question) {
    this.tts.stop()
    this.tts.say(
      question.question 
      + ', A, ' + question.answer_1
      + ', B, ' + question.answer_2
      + ', C, ' + question.answer_3
      + ', D, ' + question.answer_4
    )
  }
  private getAnswer(question: Question): string {
    switch(question.answer) {
      case 1: return question.answer_1;
      case 2: return question.answer_2;
      case 3: return question.answer_3;
      case 4: return question.answer_4;
      default: return 'Error';
    }
  }
}
enum GameState {
  Start = 'Start',
  Countdown = 'Countdown',
  Game = 'Game',
  Highscore = 'Highscore',
  Again = 'Again'
}
