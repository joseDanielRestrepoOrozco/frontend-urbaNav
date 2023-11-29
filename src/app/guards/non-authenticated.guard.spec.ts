import { TestBed } from '@angular/core/testing';

import { NonAuthenticatedGuard } from './non-authenticated.guard';

describe('NonAuthenticatedGuard', () => {
  let guard: NonAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
