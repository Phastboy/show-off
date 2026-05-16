import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';

export const BUSINESS_PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./business-profile-shell/business-profile-shell').then(
        (m) => m.BusinessProfileShell,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/my-businesses/my-businesses').then((m) => m.MyBusinesses),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/create-business/create-business').then((m) => m.CreateBusiness),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./pages/edit-business/edit-business').then((m) => m.EditBusiness),
      },
    ],
  },
];

