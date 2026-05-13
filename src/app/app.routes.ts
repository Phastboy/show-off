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
    children: [
      // ── MAIN LAYOUT (Navbar + Bottom Tabs) ─────────────
      {
        path: '',
        loadComponent: () => import('./shared/layouts/app-shell/app-shell').then((m) => m.AppShell),
        children: [
          {
            path: 'profile',
            loadComponent: () =>
              import('./features/profile/profile-page/profile-page').then((m) => m.ProfilePage),
          },
          { path: '', redirectTo: 'venues', pathMatch: 'full' },
        ],
      },
      // ── SUB-PAGE LAYOUT (Back Button + Centered Column) ─
      {
        path: '',
        loadComponent: () =>
          import('./shared/layouts/sub-page-shell/sub-page-shell').then((m) => m.SubPageShell),
        children: [],
      },
    ],
  },
  { path: '**', redirectTo: 'venues' },
];
