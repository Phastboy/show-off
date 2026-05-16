import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./shared/layouts/auth-shell/auth-shell').then((m) => m.AuthShell),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
  path: 'businesses',
  loadChildren: () =>
    import('./features/business-profile/business-profile.routes')
      .then((m) => m.BUSINESS_PROFILE_ROUTES),
},
  { path: '**', redirectTo: 'login' },
];
