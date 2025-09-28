// src/app/components/category-filters/category-filters.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-filters',
  templateUrl: './category-filters.component.html',
  styleUrls: ['./category-filters.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CategoryFiltersComponent {
  categories$: Observable<Category[]>;

  // Permitir null para el filtro “Todos”
  @Output() filterSelected = new EventEmitter<Category | null>();

  // Objeto ficticio para el botón “Todos”
  allCategory: { name: string; imgUrl: string } = {
    name: 'Todos',
    imgUrl: 'assets/icons/all.png' // Ajusta la ruta de tu icono de “Todos”
  };

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }

  selectFilter(category: Category | null) {
    this.filterSelected.emit(category);
  }
}
