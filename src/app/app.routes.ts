import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'angular-three',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/angular-three-page/angular-three-page.module').then(
        (result) => result.AngularThreePageModule,
      ),
  },
  {
    path: 'simple-three',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/simple-three-page/simple-three-page.module').then(
        (result) => result.SimpleThreePageModule,
      ),
  },
];
