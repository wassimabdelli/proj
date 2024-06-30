import { TestBed } from '@angular/core/testing';

import { BlServiceService } from './bl-service.service';

describe('BlServiceService', () => {
  let service: BlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
