import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SceneGraphComponent } from '../../components/scene-graph/scene-graph.component';
import { Camera, PerspectiveCamera } from 'three';
import { NgtState } from 'angular-three';
import { RENDERER_CLEAR_COLOR } from '../../helpers';

@Component({
  selector: 'app-angular-three',
  templateUrl: './angular-three-page.component.html',
  styleUrl: './angular-three-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularThreePageComponent {
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
