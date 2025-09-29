// src/app/components/admin-product-modal/admin-product-modal.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // 👈 Importar FormsModule y NgForm
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/core/services/product'; // 👈 Tu servicio de productos
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-product-modal',
  templateUrl: './admin-product-modal.component.html',
  styleUrls: ['./admin-product-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], // Incluir FormsModule
})
export class AdminProductModalComponent {
  newProduct: any = {
    // Objeto para el binding del formulario
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    isFeatured: true, // Por defecto, marcado como destacado
    category: 'General',
    stock: 0,
    createdAt: new Date(), // Fecha actual
  };

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService, // Inyectar el servicio de productos
    private toastCtrl: ToastController
  ) {}

  /**
   * Cierra el modal.
   */
  dismiss() {
    this.modalCtrl.dismiss();
  }

  /**
   * Agrega el nuevo producto a Firestore.
   */
  async addProduct(form: NgForm) {
    if (form.valid) {
      try {
        // Llama a una función en tu servicio para agregar el producto.
        // Asumiendo que ProductService tiene una función addProduct(data: any)
        await this.productService.addProduct(this.newProduct);

        // Mostrar notificación de éxito
        await this.presentToast('Producto añadido exitosamente. 🎉');

        // Cerrar el modal
        this.dismiss();
      } catch (error) {
        console.error('Error al añadir producto:', error);
        await this.presentToast('Error al añadir producto.', 'danger');
      }
    }
  }

  // Función helper para mostrar notificaciones
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}
