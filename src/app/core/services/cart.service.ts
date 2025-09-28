// src/app/core/services/cart.service.ts
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Product } from '../models/product.model'; // importar Product

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartProduct extends Product {
  quantity: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: Firestore, private auth: Auth) {}

  /**
   * Añade un producto al carrito del usuario logueado, con cantidad
   */
  async addToCart(productId: string, quantity: number = 1) {
    const user = this.auth.currentUser;
    console.log('CartService: Usuario actual:', user);

    if (!user) throw new Error('Usuario no logueado');

    console.log('CartService: Añadiendo productId:', productId, 'cantidad:', quantity, 'para user.uid:', user.uid);

    const cartRef = doc(this.firestore, `carts/${user.uid}`);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const cartData = cartSnap.data() as { items: CartItem[] };
      const items = cartData.items || [];

      const index = items.findIndex(item => item.productId === productId);

      if (index >= 0) {
        items[index].quantity += quantity;
        console.log('CartService: Incrementando cantidad del producto existente');
      } else {
        items.push({ productId, quantity });
        console.log('CartService: Agregando nuevo producto al carrito');
      }

      await updateDoc(cartRef, { items });
      console.log('CartService: Carrito actualizado correctamente');
    } else {
      await setDoc(cartRef, {
        customerId: user.uid,
        items: [{ productId, quantity }]
      });
      console.log('CartService: Carrito creado y producto añadido');
    }
  }

  /**
   * Obtiene el carrito completo con productos y total
   */
  async getCartWithTotal(): Promise<{ items: CartProduct[]; total: number }> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no logueado');

    const cartRef = doc(this.firestore, `carts/${user.uid}`);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) return { items: [], total: 0 };

    const cartData = cartSnap.data() as { items: CartItem[] };
    const items: CartProduct[] = [];
    let total = 0;

    for (const item of cartData.items) {
      const productRef = doc(this.firestore, `productos/${item.productId}`);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) continue;

      const productData = productSnap.data() as Product;
      const subtotal = productData.price * item.quantity;

      items.push({
        ...productData,
        id: item.productId,
        quantity: item.quantity,
        subtotal
      });

      total += subtotal;
    }

    console.log('CartService: Carrito obtenido con total:', total);
    return { items, total };
  }

  async removeFromCart(productId: string) {
  const user = this.auth.currentUser;
  if (!user) throw new Error('Usuario no logueado');

  const cartRef = doc(this.firestore, `carts/${user.uid}`);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) return;

  const cartData = cartSnap.data() as { items: CartItem[] };
  const updatedItems = (cartData.items || []).filter(item => item.productId !== productId);

  await updateDoc(cartRef, { items: updatedItems });
  console.log(`CartService: Producto ${productId} eliminado del carrito`);
}
}
