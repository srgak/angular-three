import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnimationAction, AnimationClip, AnimationMixer } from 'three';
import { GLTF, GLTFLoader } from 'three-stdlib';
import { ThreeMainService } from './three-main.service';

@Injectable({
  providedIn: 'root',
})
export class SonicModelService {
  public gltf!: GLTF;
  public mixer!: AnimationMixer;
  public action!: AnimationAction;
  public onLoaded = new Subject<GLTF>();

  constructor(private readonly threeMainService: ThreeMainService) {}

  public initModel(): void {
    const loader = new GLTFLoader();

    loader.load('models/sonic/scene.gltf', (gltf) => {
      const { scene } = gltf;

      this.gltf = gltf;
      this.mixer = new AnimationMixer(scene);

      this.threeMainService.scene.add(scene);
      this.threeMainService.saveObject('sonic', scene);

      this.onLoaded.next(gltf);
    });
  }

  public playAnimation(name: string): void {
    const clips = this.gltf.animations;
    const clip = AnimationClip.findByName(clips, name);

    this.action = this.mixer.clipAction(clip);

    this.action.play();
  }

  public stopAnimation(): void {
    this.action?.stop();
  }

  public changeAnimation(name: string): void {
    this.stopAnimation();
    this.playAnimation(name);
  }
}
