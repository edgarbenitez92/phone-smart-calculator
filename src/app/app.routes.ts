import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      import('./calculator/calculator.page').then((m) => m.CalculatorPage),
  },
  {
    path: '',
    redirectTo: 'calculator',
    pathMatch: 'full',
  },
];
