import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  bgmAudio: any;
  themeAudio: any;

  constructor(
    private settings: SettingsService
  ) { }
  private playAudio(src: string){
    if (this.settings.getSound()) {
      let audio = new Audio();
      audio.src = src;
      audio.load();
      audio.play();
      return audio;
    } else {
      return null;
    }
  }
  public correct() {
    this.playAudio('assets/sounds/correct.mp3')
  }
  public wrong() {
    this.playAudio('assets/sounds/wrong.mp3')
  }
  public start() {
    this.playAudio('assets/sounds/start.mp3')
  }
}
