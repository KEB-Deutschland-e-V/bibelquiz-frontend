import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  public questions: Question[] = [];
  public difficulties: Difficulty[] = [];
  dataOK = false;

  init(): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      this.httpClient.get<Difficulty[]>(environment.backend + '/difficulties').subscribe((data: Difficulty[]) => {
        this.difficulties = data;
        localStorage.setItem('difficulties', JSON.stringify(this.difficulties));
        this.httpClient.get<Question[]>(environment.backend + '/questions').subscribe((data: Question[]) => {
          this.questions = data;
          // add difficuty name to questions
          this.questions.forEach((q) => {
            q.difficulty_name = this.difficulties.find((d) => d.id.toString() === q.difficulty.toString())?.name;
          });
          localStorage.setItem('questions', JSON.stringify(this.questions));
          this.dataOK = true;
          resolve(this.dataOK);
        }, (error) => {
          if(localStorage.getItem('difficulties')) {
            this.difficulties = JSON.parse(localStorage.getItem('difficulties')!);
            this.dataOK = true;
            resolve(this.dataOK);
          } else { 
            this.dataOK = false;
            resolve(this.dataOK)
          }
        });
      }, (error) => {
        if(localStorage.getItem('questions')) {
          this.questions = JSON.parse(localStorage.getItem('questions')!);
          this.dataOK = true;
          resolve(this.dataOK);
        } else {
          this.dataOK = false;
          resolve(this.dataOK)
        }
      });
    })
  }

  public getRandomQuestion(difficulty: Difficulty, usedIDs: string[] = []) {
    const filtered = this.questions.filter((q) => {
      return q.difficulty === parseInt(difficulty.id) && !usedIDs.includes(q.id)
    })
    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random()*filtered.length)];
    } else {
      return null;
    }
  }

  public getDifficulties(): Difficulty[] {
    return this.difficulties;
  }

  public postStats(question: Question, answer: number, correct: boolean) {
    return this.httpClient.post(environment.backend + '/stat', {
      question: question.id,
      answer: answer,
      correct: correct ? '1': '0'
    },{
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }
  
}
export interface Question {
  id: string;
  question: string;
  bible: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  answer: number;
  difficulty: number;
  difficulty_name: string | undefined;
}
export interface Difficulty {
  points: number;
  id:string;
  name:string;
}
