import { TestBed } from '@angular/core/testing';

import { FeserviceService } from './feservice.service';

describe('FeserviceService', () => {
  let service: FeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
