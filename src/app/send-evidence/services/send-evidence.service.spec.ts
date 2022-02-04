import { TestBed } from '@angular/core/testing';

import { SendEvidenceService } from './send-evidence.service';

describe('SendEvidenceService', () => {
  let service: SendEvidenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEvidenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
