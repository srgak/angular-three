import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationClip, DirectionalLight, Mesh, MeshStandardMaterial, SphereGeometry } from 'three';
import { ThreeMainService } from '../../services/three-main.service';
import { SonicModelService } from '../../services/sonic-model.service';
import { ThreeStoreService } from '../../services/three-store.service';

@Component({
  selector: 'app-simple-three-page',
  templateUrl: './simple-three-page.component.html',
  styleUrl: './simple-three-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleThreePageComponent {
  public animations!: AnimationClip[];

  constructor(
    private readonly threeStoreService: ThreeStoreService,
    public readonly threeMainService: ThreeMainService,
    public readonly sonicModelService: SonicModelService,
  ) {}

  public onCreateCanvas(): void {
    this.threeStoreService.renderer.shadowMap.enabled = true;

    this.initObject();
    this.settingsObject();

    this.threeMainService.initControls();

    this.sonicModelService.onLoaded.subscribe(({ animations, scene }) => {
      this.animations = animations;
      scene.traverse((object) => {
        object.castShadow = true;
      });
    });
  }

  private initObject(): void {
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
    this.threeMainService.initObject(
      'sphere',
      new Mesh(
        new SphereGeometry(1, 100),
        new MeshStandardMaterial({ color: 'red', roughness: 0 }),
      ),
    );
  }

  private settingsObject(): void {
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
    this.threeMainService.settingObject('sphere', (sphere) => {
      sphere.position.set(3, 1, 0);
      sphere.castShadow = true;
    });
  }

  public animate(): void {
    this.threeMainService.settingObject('sonic', () => {
      const delta = this.threeStoreService.clock.getDelta();

      this.sonicModelService.mixer.update(delta);
    });
  }
}
