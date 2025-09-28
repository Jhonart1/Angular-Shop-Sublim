// src/app/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone'; 
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service'; // 👈 Importar AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonIcon, 
    CommonModule, 
    FormsModule
  ]
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { } 

  ngOnInit() { }

  async loginConGoogle() {
    try {
      // Usar el método de AuthService que guarda el usuario en Firestore
      const user = await this.authService.loginWithGoogle();

      console.log('Usuario logueado y guardado en Firestore:', user);

      // Redirigir al área principal (tabs)
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });

    } catch (error: any) {
      console.error('Error durante el login con Google:', error.code, error.message);
      // Aquí podrías mostrar un Toast al usuario
    }
  }
}
