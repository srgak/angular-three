import { Injectable } from '@angular/core';
import { MainSettings, ScreenSize } from '../helpers';
import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ThreeStoreService {
  public screenSizes: ScreenSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  public renderer!: WebGLRenderer;
  public scene!: Scene;
  public camera!: PerspectiveCamera;
  public canvas!: HTMLCanvasElement;
  public clock = new Clock();
  public objectsStore = new Map();

  public initStore(initialSettings: MainSettings): void {
    this.renderer = initialSettings.renderer;
    this.scene = initialSettings.scene;
    this.camera = initialSettings.camera;
    this.canvas = initialSettings.canvas;
  }

  // public updateScreenSizes(): void {
  //   this.screenSizes.width = window.innerWidth;
  //   this.screenSizes.height = window.innerHeight;
  // }

  public updateOnResize(): void {
    this.screenSizes.width = window.innerWidth;
    this.screenSizes.height = window.innerHeight;
    this.camera.aspect = this.screenSizes.width / this.screenSizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.screenSizes.width, this.screenSizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio));
    this.renderer.render(this.scene, this.camera);
  }
}
