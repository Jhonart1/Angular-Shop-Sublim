// src/app/components/product-card/product-card.component.ts
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/models/product.model';
import { ModalController } from '@ionic/angular';
import { ProductDetailModalComponent } from '../product-detail-modal-component/product-detail-modal-component.component';
import { construct } from 'ionicons/icons';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private modalCtrl: ModalController) {}

  async openDetail() {
  const modal = await this.modalCtrl.create({
    component: ProductDetailModalComponent,
    componentProps: { product: this.product },
    backdropDismiss: true, // no cerrar al tocar fuera
    cssClass: 'custom-product-modal', // <- clase personalizada
    canDismiss: async () => true, // retorna Promise<boolean>
  });
  await modal.present();
}
}
