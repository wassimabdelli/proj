import { TestBed } from '@angular/core/testing';

import { NrService } from './nr.service';

describe('NrService', () => {
  let service: NrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
