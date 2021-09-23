import { Injectable } from '@angular/core';
const Speech = require('speak-tts');

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  private speech: any;
  private canSpeak: boolean;

  constructor() {
    try {
      this.speech = new Speech() // will throw an exception if not browser supported
      if(this.speech.hasBrowserSupport()) { // returns a boolean
          console.log("speech synthesis supported")
          this.canSpeak = true;
          this.speech.init({

          });
      } else {
        this.canSpeak = false;
      }
    } catch (error) {
      console.error(error)
      this.canSpeak = false;
    }
  }
  public say(message: string) {
    if(this.canSpeak) {
      this.speech.speak({
        text: message,
      })
    }
  }
}
