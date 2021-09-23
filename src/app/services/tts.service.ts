import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor() {
  }
  public say(message: string) {
    const ut = new SpeechSynthesisUtterance(message)
    speechSynthesis.speak(ut)
  }
}
