import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { CartService } from '../core/services/cart.service';
import { ProductService } from '../core/services/product';

interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-tab-cart',
  templateUrl: './tab-cart.page.html',
  styleUrls: ['./tab-cart.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonSpinner,
    CommonModule, FormsModule, HeaderComponent
  ]
})
export class TabCartPage implements OnInit {

  loading = true;
  cartItems: CartProduct[] = [];
  total = 0;
  shipping = 0; // aquí puedes añadir lógica de envío si lo deseas

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.loadCart();
  }

  async loadCart() {
    this.loading = true;
    try {
      const { items, total } = await this.cartService.getCartWithTotal();
      this.cartItems = items as CartProduct[];
      this.total = total;
    } catch (err) {
      console.error('Error cargando carrito:', err);
    } finally {
      this.loading = false;
    }
  }

  async updateQuantity(item: CartProduct, delta: number) {
  const newQuantity = item.quantity + delta;

  if (newQuantity <= 0) {
    // Eliminar completamente
    await this.cartService.removeFromCart(item.id);
  } else {
    // Actualizar cantidad
    await this.cartService.addToCart(item.id, delta);
  }

  await this.loadCart();
}

  async removeItem(item: CartProduct) {
  await this.cartService.removeFromCart(item.id);
  await this.loadCart();
}

  get totalWithShipping() {
    return this.total + this.shipping;
  }
}
