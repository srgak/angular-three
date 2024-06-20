import { RouterModule, Routes } from '@angular/router';
import { SimpleThreePageComponent } from './simple-three-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SimpleThreePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleThreePageRoutingModule {}
