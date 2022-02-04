import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnblockNetworkUserFormComponent } from './unblock-network-user-form.component';

describe('UnblockNetworkUserFormComponent', () => {
  let component: UnblockNetworkUserFormComponent;
  let fixture: ComponentFixture<UnblockNetworkUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnblockNetworkUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnblockNetworkUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
