import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private sound:boolean = true;
  private animations:boolean = true;
  private tts:boolean = false;
  private music:boolean = true;
  constructor(
  ) { 
    this.sound = JSON.parse(localStorage.getItem('sound') || 'true');
    this.animations = JSON.parse(localStorage.getItem('animations') || 'true');
    this.tts = JSON.parse(localStorage.getItem('tts') || 'false');
    this.music = JSON.parse(localStorage.getItem('music') || 'true');
  }

  public getSound(): boolean {
    return this.sound;
  }

  public getAnimations(): boolean {
    return this.animations;
  }

  public getTTS(): boolean {
    return this.tts;
  }

  public getMusic(): boolean {
    return this.music;
  }

  public set(key:string, value:boolean) {
    localStorage.setItem(key, value ? 'true' : 'false');
    switch(key) {
      case 'sound': this.sound = value; break;
      case 'animations': this.animations = value; break;
      case 'tts': this.tts = value; break;
      case 'music': 
        this.music = value; 
        break;
    }
  }
}
