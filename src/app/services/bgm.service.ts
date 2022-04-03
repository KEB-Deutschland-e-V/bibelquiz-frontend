import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class BgmService {
  audio: any;
  constructor(private settings: SettingsService) { 
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.volume = 0.2;

  }
  private play(src: string){
    if (this.settings.getMusic()) {
      this.audio.src = src;
      this.audio.load();
      this.audio.play();
    }
  }
  public stop() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      }
  }
  public theme() {
    if (this.audio && !this.audio.paused) {
    this.audio.pause();
    }
    this.audio.volume = 0.4;
    this.play('assets/sounds/bibel_gottes_wort.mp3')
  }
  public bgm() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.audio.volume = 0.2;
    this.play('assets/sounds/bibel_gottes_wort_ohne_vocals.mp3')
  }
}
