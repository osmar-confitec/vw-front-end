import { TestBed } from '@angular/core/testing';

import { UserUnblockService } from './user-unblock.service';

describe('UserUnblockService', () => {
  let service: UserUnblockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUnblockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
