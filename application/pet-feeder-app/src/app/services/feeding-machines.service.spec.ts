import { TestBed } from '@angular/core/testing';

import { FeedingMachinesService } from './feeding-machines.service';

describe('FeedingMachinesService', () => {
  let service: FeedingMachinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedingMachinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
