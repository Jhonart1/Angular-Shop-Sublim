import { Component } from '@angular/core';
import { IonicModule, MenuController, IonButton } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SideMenuComponent {

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private authService: AuthService
  ) {}

  async closeMenu() {
    await this.menuCtrl.close('side-menu');
  }

  goToHome() {
    this.closeMenu();
    this.router.navigate(['/tabs/tab1']);
  }

  goToProducts() {
    this.closeMenu();
    this.router.navigate(['/tabs/tab2']);
  }

  async logout() {
    this.closeMenu();
    await this.authService.logout();
  }
}
