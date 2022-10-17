import { Component, OnInit } from '@angular/core';
import { BgmService } from '../services/bgm.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public userAgent: string = navigator.userAgent;
  
  constructor( private bgm: BgmService) { 
  }

  

  ngOnInit(): void {
    this.bgm.theme();
  }

}
