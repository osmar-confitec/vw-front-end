import { TestBed } from '@angular/core/testing';

import { SendReqAdInterceptor } from './send-req-ad.interceptor';

describe('SendReqAdInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SendReqAdInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SendReqAdInterceptor = TestBed.inject(SendReqAdInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
