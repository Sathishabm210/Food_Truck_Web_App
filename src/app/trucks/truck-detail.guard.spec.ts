import { TestBed } from '@angular/core/testing';

import { TruckDetailGuard } from './truck-detail.guard';

describe('TruckDetailGuard', () => {
  let guard: TruckDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TruckDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
