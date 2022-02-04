import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewCategoriesComponent } from './tree-view-categories.component';

describe('TreeViewCategoriesComponent', () => {
  let component: TreeViewCategoriesComponent;
  let fixture: ComponentFixture<TreeViewCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
