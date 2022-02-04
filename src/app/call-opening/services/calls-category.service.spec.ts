import { TestBed } from '@angular/core/testing';

import { CallsCategoryService } from './calls-category.service';

describe('CallsCategoryService', () => {
  let service: CallsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
