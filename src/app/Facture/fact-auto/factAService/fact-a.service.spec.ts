import { TestBed } from '@angular/core/testing';

import { FactAService } from './fact-a.service';

describe('FactAService', () => {
  let service: FactAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
