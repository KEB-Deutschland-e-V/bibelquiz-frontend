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
  private playAudio(src: string, volume: number = 0.5) {
    if (this.settings.getSound()) {
      let audio = new Audio();
      audio.src = src;
      audio.volume = volume;
      audio.load();
      audio.play();
      return audio;
    } else {
      return null;
    }
  }
  public correct() {
    this.playAudio('assets/sounds/correct.mp3', 0.5)
  }
  public wrong() {
    this.playAudio('assets/sounds/wrong.mp3', 0.8)
  }
  public start() {
    this.playAudio('assets/sounds/start.mp3', 0.5)
  }
}
