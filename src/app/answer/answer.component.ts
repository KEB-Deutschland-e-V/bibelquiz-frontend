import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer',
  animations: [
    trigger('selectRightWrong', [
      // ...
      state('select', style({
        backgroundColor: 'white',
        borderColor: 'gray'
      })),
      state('right', style({
        backgroundColor: 'lightgreen',
        borderColor: 'green'
      })),
      state('wrong', style({
        backgroundColor: 'lightsalmon',
        borderColor: 'red'
      })),
      transition('select => right', [
        animate('0.5s')
      ]),
      transition('select => wrong', [
        animate('0.5s')
      ]),
      transition('wrong => select', [
        animate('0.25s')
      ]),
      transition('right => select', [
        animate('0.25s')
      ]),
    ]),
  ],
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input('answer') answer: string;
  @Input('state') state: AnswerState;
  constructor() {
    this.answer = '';
    this.state = AnswerState.Select;
    // TODO: https://angular.io/guide/animations for the right / wrong / color
  }

  ngOnInit(): void {
  }

}
export enum AnswerState {
  Select = 'select',
  Right = 'right',
  Wrong = 'wrong'
}
