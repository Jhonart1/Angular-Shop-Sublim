import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; //  1. Importar la Guardia

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard] //  2. Proteger la ruta con la Guardia
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tab-cart',
    loadComponent: () => import('./tab-cart/tab-cart.page').then( m => m.TabCartPage)
  },
];
