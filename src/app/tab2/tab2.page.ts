// src/app/tab2/tab2.page.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

import { HeaderComponent } from '../components/header/header.component';
import { CategoryFiltersComponent } from '../components/category-filters/category-filters.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';

import { AuthService } from '../core/services/auth.service';
import { ProductService } from '../core/services/product';
import { Product } from '../core/models/product.model';
import { Category } from '../core/models/category.model';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    AsyncPipe,
    HeaderComponent,
    CategoryFiltersComponent,
    ProductCardComponent
  ],
})
export class Tab2Page {

  userPhotoUrl$: Observable<string | null>;
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  private selectedCategory$ = new BehaviorSubject<Category | null>(null);

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.userPhotoUrl$ = this.authService.userPhotoUrl$;
    this.products$ = this.productService.getAllProducts();

    // Filtrado dinámico: si selectedCategory es null mostramos todos
    this.filteredProducts$ = combineLatest([this.products$, this.selectedCategory$]).pipe(
      map(([products, category]) => {
        if (!category) return products;
        return products.filter(p => p.category === category.name);
      })
    );
  }

  // Corregido: ahora acepta null
  onFilterSelected(category: Category | null) {
    this.selectedCategory$.next(category);
  }
}
