import { Injectable } from '@angular/core';
import {
  AxesHelper,
  BoxGeometry,
  Camera,
  Clock,
  DirectionalLight,
  DoubleSide,
  Material,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { DirectionalLightSettings, MainSettings } from '../helpers';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root',
})
export class ThreeMainService {
  public renderer!: WebGLRenderer;
  public scene!: Scene;
  public camera!: PerspectiveCamera | OrthographicCamera;
  public canvas!: HTMLCanvasElement;
  public clock = new Clock();
  public objectsStore = new Map();

  public init(initialSettings: MainSettings): void {
    this.renderer = initialSettings.renderer;
    this.scene = initialSettings.scene;
    this.camera = initialSettings.camera;
    this.canvas = initialSettings.canvas;
  }

  public initObject(objectName: string, object: Object3D): void {
    this.scene.add(object);
    this.saveObject(objectName, object);
  }

  public initControls(): void {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.update();
  }

  public createAxesHelper(size?: number): AxesHelper {
    return new AxesHelper(size);
  }

  public createDirectionalLight(settings: DirectionalLightSettings): DirectionalLight {
    return new DirectionalLight(settings.color, settings.intensity);
  }

  public createCube(material: Material): Mesh {
    return new Mesh(new BoxGeometry(1, 1, 1), material);
  }

  public createPlane(material: Material): Mesh {
    return new Mesh(new PlaneGeometry(40, 40), material);
  }

  public createFloor(): Mesh {
    const loader = new TextureLoader();
    const texture = loader.load('imgs/texture-chess.jpeg');

    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.magFilter = NearestFilter;
    texture.colorSpace = SRGBColorSpace;
    texture.repeat.set(20, 20);

    return this.createPlane(
      new MeshStandardMaterial({
        map: texture,
        side: DoubleSide,
      }),
    );
  }

  public settingObject<T = Object3D>(
    objectName: string,
    settingsFunction: (object: T) => void,
  ): void {
    const object = this.getObject<T>(objectName);

    object && settingsFunction(object);
  }

  public settingMainCamera(settingFunction: (camera: Camera) => void): void {
    settingFunction(this.camera);
  }

  public saveObject<T>(name: string, object: T): void {
    this.objectsStore.set(name, object);
  }

  public getObject<T = Object3D>(objectName: string): T {
    return this.objectsStore.get(objectName) as T;
  }
}
