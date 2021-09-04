import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer',
  animations: [
    trigger('selectRightWrong', [
      // ...
      state('select', style({
        backgroundColor: 'white',
        boxShadow: '1px 1px 2px 2px gray',
        borderColor: 'black'
      })),
      state('right', style({
        backgroundColor: '#a5cd22',
        borderColor: 'green',
        boxShadow: '1px 1px 2px 2px #a5cd22',
        cursor: 'default'
      })),
      state('wrong', style({
        backgroundColor: 'lightsalmon',
        borderColor: 'red',
        boxShadow: '1px 1px 2px 2px lightsalmon',
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
