import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input('answer') answer: string;
  constructor() {
    this.answer = '';
    // TODO: https://angular.io/guide/animations for the right / wrong / color
  }

  ngOnInit(): void {
  }

}
