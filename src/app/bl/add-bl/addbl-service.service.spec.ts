import { TestBed } from '@angular/core/testing';

import { AddblServiceService } from './addbl-service.service';

describe('AddblServiceService', () => {
  let service: AddblServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddblServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
