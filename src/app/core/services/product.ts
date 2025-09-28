// src/app/core/services/product.service.ts

import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  query, 
  where, 
  limit, 
  addDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; // 👈 Importar la interfaz

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productsCollection = collection(this.firestore, 'productos');

  constructor(private firestore: Firestore) { }

  /**
   * Obtiene todos los productos de la colección 'productos'.
   * @returns Un Observable del array de Productos.
   */
  getAllProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  /**
   * Obtiene los productos destacados para el carrusel.
   * @param limitCount Número máximo de productos a obtener.
   * @returns Un Observable del array de Productos destacados.
   */
  getFeaturedProducts(limitCount: number = 5): Observable<Product[]> {
    // 1. Crear la consulta: Filtrar por isFeatured: true y limitar los resultados
    const featuredQuery = query(
      this.productsCollection, 
      where('isFeatured', '==', true),
      limit(limitCount)
    );

    // 2. Ejecutar la consulta y forzar el tipado
    return collectionData(featuredQuery, { idField: 'id' }) as Observable<Product[]>;
  }
  addProduct(productData: any) {
    // addDoc añade un nuevo documento con un ID generado automáticamente
    return addDoc(this.productsCollection, productData);
  }
}