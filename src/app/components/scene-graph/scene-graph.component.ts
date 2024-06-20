import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { NgtArgs, NgtRenderState, NgtStore, extend, injectBeforeRender } from 'angular-three';
import {
  AxesHelper,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  SphereGeometry,
} from 'three';
import { OrbitControls } from 'three-stdlib';
import { RENDERER_CLEAR_COLOR } from '../../helpers';
import { SceneFloorComponent } from '../scene-floor/scene-floor.component';

extend({
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  AxesHelper,
  DirectionalLight,
  DirectionalLightHelper,
  SphereGeometry,
});
extend({ OrbitControls });

@Component({
  selector: 'app-scene-graph',
  standalone: true,
  imports: [NgtArgs, SceneFloorComponent],
  templateUrl: './scene-graph.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraphComponent {
  @ViewChild('perspectiveCamera')
  public perspectiveCamera!: ElementRef<PerspectiveCamera>;

  public readonly camera = this.store.get('camera');
  public readonly glDom = this.store.get('gl', 'domElement');

  constructor(private readonly store: NgtStore) {
    injectBeforeRender((event) => this.onBeforeRender(event));
  }

  private onBeforeRender({ gl }: NgtRenderState): void {
    gl.setClearColor(RENDERER_CLEAR_COLOR);
  }
}
