import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularThreePageComponent } from './angular-three-page.component';
import { CommonModule } from '@angular/common';
import { AngularThreePageRoutingModule } from './angular-three-page-routing.module';
import { NgtCanvas } from 'angular-three';

@NgModule({
  declarations: [AngularThreePageComponent],
  imports: [CommonModule, AngularThreePageRoutingModule, NgtCanvas],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularThreePageModule {}
