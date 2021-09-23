import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }
  private playAudio(src: string){
    if(!JSON.parse(localStorage.getItem("muted") || 'false')) { // if not muted
      let audio = new Audio();
      audio.src = src;
      audio.load();
      audio.play();
    }
  }
  public correct() {
    this.playAudio('assets/sounds/correct.mp3')
  }
  public wrong() {
    this.playAudio('assets/sounds/wrong.mp3')
  }
}
