// src/app/header/header.component.ts

import { Component, OnInit, Input } from '@angular/core'; // 🎯 Importar 'Input'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonTitle, 
  IonContent, 
  IonIcon, 
  IonSearchbar, 
  IonButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonIcon,
    IonSearchbar,
    IonButton
  ]
})
export class HeaderComponent implements OnInit {

  // 🎯 @Input() CLAVE: Recibe la URL de la foto de perfil del componente padre (ej: Tab1Page)
  @Input() userPhotoUrl: string | null = null;
  
  constructor(private router: Router) { }

  ngOnInit() { }

  // El método 'onCartClick' no tiene lógica de redirección por el momento.
  onCartClick() {
    this.router.navigate(['/tabs/tab-cart']);
  }

  /** * Redirige a la página de Home (Tab 1).
   * Asignado al logo y al enlace "Home".
   */
  goToHome() {
    this.router.navigate(['/tabs/tab1']);
  }

  /** * Redirige a la página de Productos (Tab 2).
   * Asignado al enlace "Productos".
   */
  goToProducts() {
    this.router.navigate(['/tabs/tab2']);
  }

  /** * Redirige a la página de Perfil/Cuenta (Tab 3).
   * Asignado al botón de imagen de perfil.
   */
  goToProfile() {
    this.router.navigate(['/tabs/tab3']);
  }


}