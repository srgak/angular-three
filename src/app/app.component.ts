import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgtCanvas, NgtState, extend } from 'angular-three';
import { SceneGraphComponent } from './components/scene-graph/scene-graph.component';
import { Camera, CameraHelper, PerspectiveCamera } from 'three';
import { RENDERER_CLEAR_COLOR } from './helpers';

extend(CameraHelper);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgtCanvas],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  public readonly sceneGraph = SceneGraphComponent;
  public get camera(): Camera {
    const camera = new PerspectiveCamera(75, 1, 0.1, 100);

    camera.position.set(0, 7, 6);

    return camera;
  }

  public onCreate({ gl }: NgtState): void {
    gl.setClearColor(RENDERER_CLEAR_COLOR);
  }
}
