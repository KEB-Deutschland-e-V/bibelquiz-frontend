import { TestBed } from '@angular/core/testing';

import { DifficultiesService } from './difficulties.service';

describe('DifficultiesService', () => {
  let service: DifficultiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifficultiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
