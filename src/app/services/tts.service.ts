import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  private ut: any;
  constructor(
    private settings: SettingsService
  ) {
    this.ut = new SpeechSynthesisUtterance()
  }
  public say(message: string) {
    if (environment.flags.tts && this.settings.getTTS()) {
      this.ut.text = message;
      speechSynthesis.speak(this.ut)
    }
  }
  public stop() {
    if (environment.flags.tts && this.settings.getTTS()) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    }
  }
}
