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
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layouts/app-shell/app-shell').then((m) => m.AppShell),
    children: [
      {
        path: 'venues/:id',
        loadComponent: () =>
          import('./features/venues/venue-detail/venue-detail').then((m) => m.VenueDetail),
      },
      {
        path: 'venues',
        loadComponent: () =>
          import('./features/venues/venue-list/venue-list').then((m) => m.VenueList),
      },
      {
        path: 'venues/create',
        loadComponent: () =>
          import('./features/venues/create-venue/create-venue').then((m) => m.CreateVenue),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile-page/profile-page').then((m) => m.ProfilePage),
      },
      { path: '', redirectTo: 'venues', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'venues' },
];
