import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtArgs, extend } from 'angular-three';
import {
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from 'three';

extend({
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
});

@Component({
  selector: 'app-scene-floor',
  standalone: true,
  imports: [NgtArgs],
  templateUrl: './scene-floor.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneFloorComponent {
  public readonly rotation = [Math.PI * -0.5, 0, 0];
  public readonly side = DoubleSide;

  public get texure(): Texture {
    const loader = new TextureLoader();
    const texture = loader.load('imgs/texture-chess.jpeg');

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.magFilter = NearestFilter;
    texture.colorSpace = SRGBColorSpace;
    texture.repeat.set(20, 20);

    return texture;
  }
}
