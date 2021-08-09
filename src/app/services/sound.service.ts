import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }
  private playAudio(src: string){
    let audio = new Audio();
    //Can externalize the variables
    audio.src = src;
    audio.load();
    audio.play();
  }
  public correct() {
    this.playAudio('assets/sounds/correct.mp3')
  }
  public wrong() {
    this.playAudio('assets/sounds/wrong.mp3')
  }
}
