import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // 👈 Necesario
import { getAuth, provideAuth } from '@angular/fire/auth'; // 👈 Necesario
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // 👈 CLAVE
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 1. Importaciones de Firebase

// 2. Importación de la configuración
// (Asegúrate que la ruta y el nombre 'firebaseConfig' sean correctos)
import { environment } from './app/firebase.config';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({}),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    GooglePlus,

    // ✅ CORRECCIÓN CLAVE: Los providers de AngularFire van DIRECTAMENTE aquí.
    // Esto resuelve el error de tipos.
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    // 🎯 3. PROVEEDOR DE FIRESTORE (Database)
    // ESTA LÍNEA DEBE EXISTIR PARA INYECTAR 'Firestore2'
    provideFirestore(() => getFirestore()),

    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
