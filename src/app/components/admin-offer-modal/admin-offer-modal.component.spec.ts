import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminOfferModalComponent } from './admin-offer-modal.component';

describe('AdminOfferModalComponent', () => {
  let component: AdminOfferModalComponent;
  let fixture: ComponentFixture<AdminOfferModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminOfferModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
