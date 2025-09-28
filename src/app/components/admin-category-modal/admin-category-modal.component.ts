import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-admin-category-modal',
  templateUrl: './admin-category-modal.component.html',
  styleUrls: ['./admin-category-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminCategoryModalComponent {

  newCategory: Category = {
    name: '',
    imgUrl: '',
    color: '#13a4ec'
  };

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService,
    private toastCtrl: ToastController
  ) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async addCategory(form: NgForm) {
    if (form.valid) {
      try {
        await this.categoryService.addCategory(this.newCategory); // Método que añadimos al servicio
        await this.presentToast('Categoría añadida exitosamente 🎉');
        this.dismiss();
      } catch (error) {
        console.error('Error al añadir categoría:', error);
        await this.presentToast('Error al añadir categoría', 'danger');
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
