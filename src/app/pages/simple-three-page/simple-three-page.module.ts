import { NgModule } from '@angular/core';
import { SimpleThreePageComponent } from './simple-three-page.component';
import { CommonModule } from '@angular/common';
import { SimpleThreePageRoutingModule } from './simple-three-page-routing.module';
import { CanvasComponent } from '../../components/custom/canvas/canvas.component';

@NgModule({
  declarations: [SimpleThreePageComponent],
  imports: [CommonModule, SimpleThreePageRoutingModule, CanvasComponent],
})
export class SimpleThreePageModule {}
