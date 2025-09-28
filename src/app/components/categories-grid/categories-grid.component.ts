// src/app/components/categories-grid/categories-grid.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categories-grid',
  standalone: true,
  imports: [CommonModule, IonicModule, AsyncPipe],
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit {

  categories$!: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  trackById(index: number, item: Category) {
    return item.id;
  }

  toRGBA(color: string, alpha: number = 0.6): string {
  return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
  }

}
