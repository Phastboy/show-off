import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'personalization',
    loadChildren: () =>
      import('./features/personalization/personalization.routes').then(
        (m) => m.personalizationRoutes,
      ),
  },
  {
    path: '',
    redirectTo: 'personalization',
    pathMatch: 'full',
  },
];
