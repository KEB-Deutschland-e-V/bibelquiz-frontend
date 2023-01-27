import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DifficultiesService {

  constructor(private httpClient: HttpClient) { }

  public difficulties: Difficulty[] = [];
  dataOK = false;

  init(): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      this.httpClient.get<Difficulty[]>(environment.backend + '/difficulties').subscribe((data: Difficulty[]) => {
        this.difficulties = data;
        localStorage.setItem('difficulties', JSON.stringify(this.difficulties));
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
      })
  }
  public getDifficulties(): Difficulty[] {
    return this.difficulties;
  }
  public getPointsforDifficulty(difficulty_id: number): number {
    return this.difficulties.find((d) => {
      return parseInt(d.id) === difficulty_id
    })!.points
  }
}
export interface Difficulty {
  points: number;
  id:string;
  name:string;
}

