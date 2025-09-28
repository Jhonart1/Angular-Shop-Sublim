import firebase from 'firebase/app';
import { FieldValue } from 'firebase/firestore'; 

/**
 * Interfaz que define la estructura de un Producto
 * en la colección 'productos' de Firestore.
 */
export interface Product {
  // El ID del documento de Firestore (opcional,
  id?: string; 
  
  // Información básica del producto
  name: string;
  description: string;
  price: number;
  stock: number;
  
  // Multimedia
  imageUrl: string;
  
  // Categorización y metadatos
  category: string;
  isFeatured: boolean; // Para productos destacados en el carousel
  createdAt: FieldValue; // Para usar timestamps de Firebase
}