import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOpeningFormComponent } from './call-opening-form.component';

describe('CallOpeningFormComponent', () => {
  let component: CallOpeningFormComponent;
  let fixture: ComponentFixture<CallOpeningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallOpeningFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallOpeningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
