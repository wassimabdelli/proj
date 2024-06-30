import { TestBed } from '@angular/core/testing';

import { EventesService } from './eventes.service';

describe('EventesService', () => {
  let service: EventesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
