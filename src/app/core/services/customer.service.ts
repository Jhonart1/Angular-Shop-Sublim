import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';

export interface Customer {
  customerId: string;
  email: string | null;
  photoUrl: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: Firestore) { }

  /**
   * Crea o actualiza un cliente en la colección 'Customers'.
   * @param user Objeto User de Firebase Auth
   */
  async upsertCustomer(user: User): Promise<void> {
    if (!user.uid) throw new Error('El usuario no tiene UID');

    const customerRef = doc(this.firestore, `customers/${user.uid}`);
    const customerData: Customer = {
      customerId: user.uid,
      email: user.email,
      photoUrl: user.photoURL
    };
    await setDoc(customerRef, customerData, { merge: true });
  }

  async getCustomerById(uid: string): Promise<Customer | null> {
    const customerRef = doc(this.firestore, `customers/${uid}`);
    const snapshot = await getDoc(customerRef);
    if (snapshot.exists()) {
      return snapshot.data() as Customer;
    }
    return null;
  }
}
