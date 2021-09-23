import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

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
    if (this.settings.getTTS()) {
      this.ut.text = message;
      speechSynthesis.speak(this.ut)
    }
  }
  public stop() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }
}
