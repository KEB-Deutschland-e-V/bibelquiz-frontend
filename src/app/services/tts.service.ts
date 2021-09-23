import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  private ut: any;
  constructor() {
    this.ut = new SpeechSynthesisUtterance()
  }
  public say(message: string) {
    this.ut.text = message;
    speechSynthesis.speak(this.ut)
  }
  public stop() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }
}
