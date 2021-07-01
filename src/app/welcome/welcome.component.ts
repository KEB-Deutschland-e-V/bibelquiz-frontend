import { Component, OnInit } from '@angular/core';
import { BackendService, Question } from '../services/backend.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  question: Question;

  constructor(backendService: BackendService) { 
    this.question = backendService.getRandomQuestion(1);
  }

  

  ngOnInit(): void {
  }

}
