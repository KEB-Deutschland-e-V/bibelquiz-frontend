import { Component } from '@angular/core';

import packageInfo from '../../package.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public version: string = packageInfo.version;
  public muted: boolean;
  constructor(){
    this.muted = JSON.parse(localStorage.getItem("muted") || 'false');
  }
  public mute() {
    this.muted = !this.muted
    localStorage.setItem('muted', this.muted ? 'true' : 'false');
  }
}
