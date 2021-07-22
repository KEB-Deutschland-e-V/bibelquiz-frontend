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
        borderColor: 'green',
        cursor: 'default'
      })),
      state('wrong', style({
        backgroundColor: 'lightsalmon',
        borderColor: 'red',
        cursor: 'default'
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
    // TODO: disable on other thhan select
    // TODO: better styling
    // TODO: hover style not working ...
  }

  ngOnInit(): void {
  }

}
export enum AnswerState { 
  Select = 'select',
  Right = 'right',
  Wrong = 'wrong'
}
