import { TestBed } from '@angular/core/testing';

import { ServiceUCService } from './service-uc.service';

describe('ServiceUCService', () => {
  let service: ServiceUCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
