import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { CategoriesGridComponent } from '../components/categories-grid/categories-grid.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { AuthService } from '../core/services/auth.service';
import { ProductsCarouselComponent } from '../components/products-carousel/products-carousel.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, 
  imports: [
    AsyncPipe,
    CommonModule,
    IonicModule,
    HeaderComponent,
    CarouselComponent,
    CategoriesGridComponent,
    SideMenuComponent,
    ProductsCarouselComponent
  ],
})
export class Tab1Page {
  userPhotoUrl$: Observable<string | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.userPhotoUrl$ = this.authService.userPhotoUrl$;
  }
}
