// auth.service.ts (modificado)

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerService } from './customer.service'; // 👈 Importar el servicio

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser$: Observable<User | null> = user(this.auth);

  public userPhotoUrl$: Observable<string | null> = this.currentUser$.pipe(
    map(user => user ? user.photoURL : null)
  );

  constructor(private auth: Auth, private router: Router, private customerService: CustomerService) { }

  async loginWithGoogle() {
    await setPersistence(this.auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(this.auth, provider);
      
      // Guardar o actualizar usuario en Customers
      await this.customerService.upsertCustomer(result.user);

      return result.user;
    } catch (error: any) {
      console.error('Error durante el inicio de sesión con Google:', error.code, error.message);
      throw error;
    }
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
