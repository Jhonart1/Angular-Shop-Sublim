
export interface Category {
  id?: string;    // ✅ ID del documento (Firestore lo genera automáticamente)
  name: string;   // ✅ Nombre de la categoría
  imgUrl: string; // ✅ Enlace a la imagen de la categoría
  color: string;  // ✅ Color principal de la tarjeta
}
