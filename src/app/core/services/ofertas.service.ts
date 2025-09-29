import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Oferta } from '../models/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  private readonly collectionName = 'ofertas';

  constructor(private firestore: Firestore) {}

  getVisibleOffers(): Observable<Oferta[]> {
    const ofertasRef = collection(this.firestore, this.collectionName);
    const q = query(ofertasRef, where('isVisible', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Oferta[]>;
  }

  /**
   * Añade una nueva oferta a Firestore
   */
  async addOffer(offer: Oferta) {
    const ofertasRef = collection(this.firestore, this.collectionName);
    await addDoc(ofertasRef, offer);
  }

}