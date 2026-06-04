import { Routes } from '@angular/router';

export const personalizationRoutes: Routes = [
  {
    path: 'theme',
    loadComponent: () => import('./theme-switcher/theme-switcher').then((m) => m.ThemeSwitcher),
  },
  {
    path: '',
    redirectTo: 'theme',
    pathMatch: 'full',
  },
];
