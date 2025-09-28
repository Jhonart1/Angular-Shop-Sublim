import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ProductService } from 'src/app/core/services/product';
import { Product } from 'src/app/core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [CommonModule, IonicModule, AsyncPipe, ProductCardComponent],
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Traemos todos los productos para el carrusel
    this.products$ = this.productService.getAllProducts();
  }
}
