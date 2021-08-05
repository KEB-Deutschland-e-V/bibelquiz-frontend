import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      this.httpClient.get<Question[]>(environment.backend + '/questions').subscribe((data: Question[]) => {
        this.questions = data;
        
        this.httpClient.get<Difficulty[]>(environment.backend + '/difficulties').subscribe((data: Difficulty[]) => {
          this.difficulties = data;
          
          this.dataOK = true;
          resolve(this.dataOK);
        }, (error) => {
          this.dataOK = false;
          resolve(this.dataOK)
        });
      }, (error) => {
        this.dataOK = false;
        resolve(this.dataOK)
      });
    })
  }

  public getRandomQuestion(difficulty: Difficulty) {
    // TODO: Prevent same question! (Game remembers Id and posts it. Function checks if id is in random. If not ok, If yes repeat)
    const filtered = this.questions.filter(q => q.difficulty === parseInt(difficulty.id))
    return filtered[Math.floor(Math.random()*filtered.length)];
  }

  public getDifficulties(): Difficulty[] {
    return this.difficulties;
  }

  public postStats(question: Question, answer: number) {
    return this.httpClient.post(environment.backend + '/stat', {
      question: question,
      answer: answer
    });
  }
  
}
export interface Question {
  id: string;
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  answer: number;
  difficulty: number;
}
export interface Difficulty {
  id:string;
  name:string;
}
