import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
  path: 'auth',
  loadChildren: () =>
    import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
},
  {
  path: 'businesses',
  loadChildren: () =>
    import('./features/business-profile/business-profile.routes')
      .then((m) => m.BUSINESS_PROFILE_ROUTES),
},
  { path: '**', redirectTo: 'login' },
];
