import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCategoryModalComponent } from './admin-category-modal.component';

describe('AdminCategoryModalComponent', () => {
  let component: AdminCategoryModalComponent;
  let fixture: ComponentFixture<AdminCategoryModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminCategoryModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
