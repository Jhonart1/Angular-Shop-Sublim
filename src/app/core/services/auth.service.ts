// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  user,
  User,
  signInWithCredential,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerService } from './customer.service';

// Helpers
import { Capacitor } from '@capacitor/core';
// Plugin Google Plus
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$: Observable<User | null> = user(this.auth);

  public userPhotoUrl$: Observable<string | null> = this.currentUser$.pipe(
    map((user) => (user ? user.photoURL : null))
  );

  constructor(
    private auth: Auth,
    private router: Router,
    private customerService: CustomerService,
    private googlePlus: GooglePlus // 👈 ya disponible por el provider en main.ts
  ) {}

  async loginWithGoogle() {
    await setPersistence(this.auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();

    try {
      if (Capacitor.isNativePlatform()) {
        // 📱 Flujo nativo Android/iOS con GooglePlus
        const gplusUser = await this.googlePlus.login({
          webClientId:
            '1033261148799-ud5t6lci0m5csc3kcshid84jkrfb2mjm.apps.googleusercontent.com',
          offline: true, // importante para obtener idToken
        });

        console.log('✅ GooglePlus result:', gplusUser);

        const idToken = gplusUser.idToken;
        if (!idToken) throw new Error('No se obtuvo idToken de GooglePlus');

        const credential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(
          this.auth,
          credential
        );

        console.log('✅ Firebase userCredential:', userCredential);

        await this.customerService.upsertCustomer(userCredential.user);
        return userCredential.user;
      } else {
        // 🌐 Flujo Web
        const result = await signInWithPopup(this.auth, provider);

        await this.customerService.upsertCustomer(result.user);
        return result.user;
      }
    } catch (error: any) {
      console.error(
        'Error durante el inicio de sesión con Google:',
        error.code || error,
        error.message || error
      );
      throw error;
    }
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
