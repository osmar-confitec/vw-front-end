import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEvidenceFormComponent } from './send-evidence-form.component';

describe('SendEvidenceFormComponent', () => {
  let component: SendEvidenceFormComponent;
  let fixture: ComponentFixture<SendEvidenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEvidenceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEvidenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
