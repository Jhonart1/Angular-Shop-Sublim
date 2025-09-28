// src/app/components/product-detail-modal-component/product-detail-modal-component.component.ts
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, IonButton, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal-component.component.html',
  styleUrls: ['./product-detail-modal-component.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ProductDetailModalComponent {
  @Input() product!: Product;
  quantity: number = 1;

  constructor(
    private modalCtrl: ModalController,
    private cartService: CartService,
    private toastCtrl: ToastController
  ) {}

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  async addToCart() {
    console.log('Modal: intentando añadir al carrito');

    try {
      console.log('Producto recibido en modal:', this.product);

      if (!this.product.id) {
        console.error('El producto no tiene ID, no se puede añadir al carrito');
        const toast = await this.toastCtrl.create({
          message: 'Error: El producto no tiene ID',
          duration: 1500,
          color: 'danger',
        });
        toast.present();
        return;
      }

      console.log('Llamando a CartService.addToCart con productId:', this.product.id, 'y cantidad:', this.quantity);

      // 🔹 Llamada al servicio pasando la cantidad seleccionada
      await this.cartService.addToCart(this.product.id, this.quantity);

      console.log('CartService.addToCart terminó correctamente');

      const toast = await this.toastCtrl.create({
        message: 'Producto añadido al carrito',
        duration: 1500,
        color: 'success',
      });
      toast.present();

      this.modalCtrl.dismiss({
        added: true,
        product: this.product,
        quantity: this.quantity,
      });

    } catch (error) {
      console.error('Error atrapado en modal:', error);

      const toast = await this.toastCtrl.create({
        message: 'Error al añadir al carrito',
        duration: 1500,
        color: 'danger',
      });
      toast.present();
    }
  }

  cancel() {
    this.modalCtrl.dismiss({ cancelled: true });
  }
}
