import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamemodesService {

  constructor(private httpClient: HttpClient) { }

  public gamemodes: GameMode[] = [];
  dataOK = false;

  init(): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      this.httpClient.get<GameMode[]>(environment.backend + '/gamemodes').subscribe((data: GameMode[]) => {
        this.gamemodes = data;
        localStorage.setItem('gamemodes', JSON.stringify(this.gamemodes));
          this.dataOK = true;
          resolve(this.dataOK);
        }, (error) => {
          if(localStorage.getItem('gamemodes')) {
            this.gamemodes = JSON.parse(localStorage.getItem('gamemodes')!);
            this.dataOK = true;
            resolve(this.dataOK);
          } else { 
            this.dataOK = false;
            resolve(this.dataOK)
          }
        });
      })
  }
  public getGamemodes(): GameMode[] {
    return this.gamemodes;
  }
  public getLivesforGamemode(gamemode_id: number): number {
    return this.gamemodes.find((d) => {
      return parseInt(d.id) === gamemode_id
    })!.lives
  }
}
export interface GameMode {
  questions: number;
  lives: number;
  id:string;
  name:string;
}
