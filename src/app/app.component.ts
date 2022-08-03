import { Component } from '@angular/core';

import packageInfo from '../../package.json';
import { SettingsService } from './services/settings.service';

import { BgmService } from './services/bgm.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public version: string = packageInfo.version;
  public ttsEnabled: boolean = environment.flags.tts;

  public settings: any = {
    sound: true,
    animations: true,
    tts: false,
    music: true
  };
  constructor(
    private settingsService: SettingsService, 
    private bgm: BgmService
  ){
    this.settings.sound = this.settingsService.getSound();
    this.settings.animations = this.settingsService.getAnimations();
    if (this.ttsEnabled) {
      this.settings.tts = this.settingsService.getTTS();
    }
    this.settings.music = this.settingsService.getMusic();
  }
  public toggle (key: string) {
    this.settingsService.set(key, !this.settings[key]);
    switch(key) {
      case 'tts': this.settings.tts = this.settingsService.getTTS(); break;
      case 'animations': this.settings.animations = this.settingsService.getAnimations(); break;
      case 'sound': this.settings.sound = this.settingsService.getSound(); break;
      case 'music': 
        this.settings.music = this.settingsService.getMusic(); 
        if (this.settings.music) {
          this.bgm.theme();
        } else {
          this.bgm.stop();
        }
        break;
    }
  }
}
