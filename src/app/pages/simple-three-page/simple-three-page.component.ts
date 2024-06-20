import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationClip, DirectionalLight } from 'three';
import { ThreeMainService } from '../../services/three-main.service';
import { SonicModelService } from '../../services/sonic-model.service';

@Component({
  selector: 'app-simple-three-page',
  templateUrl: './simple-three-page.component.html',
  styleUrl: './simple-three-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleThreePageComponent {
  public animations!: AnimationClip[];

  constructor(
    public readonly threeMainService: ThreeMainService,
    public readonly sonicModelService: SonicModelService,
  ) {}

  public onCreateCanvas(): void {
    this.threeMainService.renderer.shadowMap.enabled = true;

    this.threeMainService.initObject(
      'directionalLight',
      this.threeMainService.createDirectionalLight({ color: 'white', intensity: 1 }),
    );
    this.threeMainService.initObject(
      'directionalLight2',
      this.threeMainService.createDirectionalLight({ color: 'white', intensity: 1 }),
    );
    this.threeMainService.initObject('floor', this.threeMainService.createFloor());
    this.threeMainService.initObject('axesHelper', this.threeMainService.createAxesHelper(3));

    this.sonicModelService.initModel();

    this.threeMainService.settingObject('floor', (plane) => {
      plane.rotateX(Math.PI * -0.5);
      plane.receiveShadow = true;
    });
    this.threeMainService.settingObject<DirectionalLight>('directionalLight', (light) => {
      light.position.set(-10, 10, 5);
      light.castShadow = true;
    });
    this.threeMainService.settingObject<DirectionalLight>('directionalLight2', (light) => {
      light.position.set(10, 10, 5);
    });
    this.threeMainService.settingMainCamera((camera) => {
      camera.position.set(-5, 5, 5);
    });

    this.threeMainService.initControls();

    this.sonicModelService.onLoaded.subscribe(({ animations }) => {
      this.animations = animations;
    });
  }

  public animate(): void {
    this.threeMainService.settingObject('sonic', () => {
      const delta = this.threeMainService.clock.getDelta();

      this.sonicModelService.mixer.update(delta);
    });
  }
}
