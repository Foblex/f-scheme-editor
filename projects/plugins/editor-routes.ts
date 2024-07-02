import { Routes } from '@angular/router';
import { EEntityType } from '@core';

export const EDITOR_ROUTES: Routes = [
  {
    path: EEntityType.PALETTE + '/:uid',
    loadComponent: () => import('./scheme-drawer/src/components/root/scheme-root.component').then((m) => m.SchemeRootComponent)
  },
  {
    path: EEntityType.SCHEME_DRAWER + '/:uid',
    loadComponent: () => import('./scheme-drawer/src/components/root/scheme-root.component').then((m) => m.SchemeRootComponent)
  },
];
