import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { OfertasService } from 'src/app/core/services/ofertas.service';
import { Oferta } from 'src/app/core/models/oferta.model';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-offer-modal',
  templateUrl: './admin-offer-modal.component.html',
  styleUrls: ['./admin-offer-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminOfferModalComponent {

  newOffer: Oferta = {
    name: '',
    description: '',
    imgUrl: '',
    isVisible: true
  };

  constructor(
    private modalCtrl: ModalController,
    private ofertasService: OfertasService,
    private toastCtrl: ToastController
  ) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async addOffer(form: NgForm) {
    if (form.valid) {
      try {
        await this.ofertasService.addOffer(this.newOffer); // Método que crearemos en OfertasService
        await this.presentToast('Oferta añadida exitosamente 🎉');
        this.dismiss();
      } catch (error) {
        console.error('Error al añadir oferta:', error);
        await this.presentToast('Error al añadir oferta', 'danger');
      }
    }
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color
    });
    toast.present();
  }
}
