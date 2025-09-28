// src/app/tab3/tab3.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 🎯 Quitar ToastController, ModalController si no se usan en el constructor o ngOnInit
import { IonicModule, ToastController, ModalController} from '@ionic/angular'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// ❌ Quitamos las importaciones directas de Firebase (Auth, user, User)
import { User } from '@angular/fire/auth'; // Solo necesitamos el tipo User, pero lo inyectaremos del servicio.
import { AdminProductModalComponent } from '../components/admin-product-modal/admin-product-modal.component';
import { AdminOfferModalComponent } from '../components/admin-offer-modal/admin-offer-modal.component';
import { AdminCategoryModalComponent } from '../components/admin-category-modal/admin-category-modal.component';

// 🎯 Importar el servicio de autenticación
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  // Asegúrate de que AdminProductModalComponent esté importado si lo usas en el HTML
  imports: [IonicModule, CommonModule, FormsModule, AdminProductModalComponent, AdminOfferModalComponent, AdminCategoryModalComponent],
})
export class Tab3Page implements OnInit {
  
  user$: Observable<User | null>;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private authService: AuthService
  ) {
    this.user$ = this.authService.currentUser$ as Observable<User | null>;
  }

  ngOnInit() {
  }

  /**
   * Cierra la sesión del usuario llamando al servicio.
   */
  async logout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada exitosamente');
    } catch (e) {
      console.error('Error al cerrar sesión:', e);
    }
  }

  getUserInitials(displayName: string | null): string {
    if (!displayName) {
      return '?';
    }
    const parts = displayName.split(' ');
    let initials = parts[0].charAt(0);
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0);
    }
    return initials.toUpperCase();
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Función disponible próximamente. 🛠️',
      duration: 2000, 
      position: 'bottom', 
      color: 'dark' 
    });
    toast.present();
  }

  /**
   * Abre el modal de administración de productos.
   */
  async openAdminModal() {
    // Usamos la clase cssClass definida previamente en el modal (admin-product-modal-desktop)
    const modal = await this.modalController.create({
      component: AdminProductModalComponent, 
      cssClass: 'admin-product-modal-desktop', 
    });

    await modal.present();
  }

  /**
   * Abre el modal de administracion de ofertas
   */
  async openAdminOfferModal() {
    const modal = await this.modalController.create({
      component: AdminOfferModalComponent,
      cssClass: 'admin-product-modal-desktop', // puedes usar la misma clase CSS que el modal de productos
    });

  await modal.present();
  }
  async openAdminCategoryModal() {
    const modal = await this.modalController.create({
      component: AdminCategoryModalComponent,
      cssClass: 'admin-product-modal-desktop', // misma clase CSS que los otros modales
    });

    await modal.present();
  }
}