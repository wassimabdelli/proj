import { TestBed } from '@angular/core/testing';

import { ServiceUBLService } from './service-ubl.service';

describe('ServiceUBLService', () => {
  let service: ServiceUBLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUBLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
