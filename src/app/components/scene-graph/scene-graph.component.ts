import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { NgtArgs, NgtRenderState, NgtStore, extend, injectBeforeRender } from 'angular-three';
import {
  AxesHelper,
  DoubleSide,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  PerspectiveCamera,
  PlaneGeometry,
  RectAreaLight,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from 'three';
import { OrbitControls } from 'three-stdlib';
import { RectAreaLightHelper } from 'three-stdlib';
import { RENDERER_CLEAR_COLOR } from '../../helpers';

extend({
  Texture,
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  SRGBColorSpace,
  MathUtils,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
  RectAreaLight,
  RectAreaLightHelper,
  AxesHelper,
});
extend({ OrbitControls });
extend({ RectAreaLightHelper });

@Component({
  selector: 'app-scene-graph',
  standalone: true,
  imports: [NgtArgs],
  templateUrl: './scene-graph.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraphComponent {
  @ViewChild('perspectiveCamera')
  public perspectiveCamera!: ElementRef<PerspectiveCamera>;

  public readonly camera = this.store.get('camera');
  public readonly glDom = this.store.get('gl', 'domElement');
  public readonly planeRotationX = Math.PI * -0.5;
  public readonly planeSide = DoubleSide;

  public get planeTexure(): Texture {
    const loader = new TextureLoader();
    const texture = loader.load('imgs/texture-chess.png');

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.magFilter = NearestFilter;
    texture.colorSpace = SRGBColorSpace;
    texture.repeat.set(20, 20);

    return texture;
  }

  public get rectAreaLightRotation(): number[] {
    return [MathUtils.degToRad(-90), MathUtils.degToRad(-45), 0];
  }

  constructor(private readonly store: NgtStore) {
    injectBeforeRender((event) => this.onBeforeRender(event));
  }

  private onBeforeRender({ gl }: NgtRenderState): void {
    gl.setClearColor(RENDERER_CLEAR_COLOR);
  }
}
