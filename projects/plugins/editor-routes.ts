import { Routes } from '@angular/router';
import { EEntityType } from '@core';

export const EDITOR_ROUTES: Routes = [
  {
    path: EEntityType.SCHEME_DRAWER + '/:uid',
    loadComponent: () => import('./scheme/src/components/root/scheme-root.component').then((m) => m.SchemeRootComponent)
  },
];
