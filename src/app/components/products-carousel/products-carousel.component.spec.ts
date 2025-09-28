import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsCarouselComponent } from './products-carousel.component';

describe('ProductsCarouselComponent', () => {
  let component: ProductsCarouselComponent;
  let fixture: ComponentFixture<ProductsCarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProductsCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
