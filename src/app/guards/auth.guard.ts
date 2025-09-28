// src/app/guards/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

/**
 * Guardia de ruta para proteger rutas que requieren autenticación.
 * Redirige a '/login' si el usuario no está autenticado.
 */
export const AuthGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // 'authState' es un Observable que emite el usuario o null cuando cambia el estado.
  return authState(auth).pipe(
    take(1), // Tomamos el primer valor y luego nos desuscribimos.
    map(user => {
      if (user) {
        // Usuario logueado, permite el acceso a la ruta.
        return true;
      } else {
        // Usuario NO logueado, redirige al login.
        console.log('Acceso denegado. Redirigiendo a /login');
        return router.createUrlTree(['/login']);
      }
    })
  );
};