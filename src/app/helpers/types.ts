import {
  ColorRepresentation,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export interface ScreenSize {
  width: number;
  height: number;
}

export interface MainSettings {
  screenSize: ScreenSize;
  scene: Scene;
  canvas: HTMLCanvasElement;
  camera: PerspectiveCamera | OrthographicCamera;
  renderer: WebGLRenderer;
}

export interface DirectionalLightSettings {
  color?: ColorRepresentation;
  intensity?: number;
}
