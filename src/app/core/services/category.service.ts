// src/app/core/services/category.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model'; 

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly collectionName = 'categorias';

  constructor(private firestore: Firestore) {}

  /**
   * Obtiene todas las categorías de la colección 'categorias'
   */
  getCategories(): Observable<Category[]> {
    const categoriasRef = collection(this.firestore, this.collectionName);
    return collectionData(categoriasRef, { idField: 'id' }) as Observable<Category[]>;
  }

  /**
   * Añade una nueva categoría a Firestore
   */
  async addCategory(category: Category) {
    const categoriasRef = collection(this.firestore, this.collectionName);
    await addDoc(categoriasRef, category);
  }
}
