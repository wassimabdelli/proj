import { TestBed } from '@angular/core/testing';

import { ServiceUfactService } from './service-ufact.service';

describe('ServiceUfactService', () => {
  let service: ServiceUfactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUfactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
