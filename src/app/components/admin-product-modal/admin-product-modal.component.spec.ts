import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminProductModalComponent } from './admin-product-modal.component';

describe('AdminProductModalComponent', () => {
  let component: AdminProductModalComponent;
  let fixture: ComponentFixture<AdminProductModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminProductModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
