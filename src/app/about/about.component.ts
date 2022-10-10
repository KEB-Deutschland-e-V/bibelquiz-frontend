import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public userAgent: string = navigator.userAgent;


  constructor() { }

  ngOnInit(): void {
  }

}
