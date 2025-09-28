// src/app/core/models/oferta.model.ts
export interface Oferta {
  name: string;       // título de la oferta
  description?: string;// descripción de la oferta (opcional)
  imgUrl: string;     // url de la imagen
  isVisible: boolean; // controla si aparece en el carrusel
}
