import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./shared/layouts/auth-shell/auth-shell').then((m) => m.AuthShell),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register').then((m) => m.Register),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/venues/home/home').then((m) => m.Home),
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];
