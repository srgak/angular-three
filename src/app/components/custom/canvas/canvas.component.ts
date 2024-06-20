import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MainSettings, ScreenSize } from '../../../helpers';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { ThreeMainService } from '../../../services/three-main.service';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements AfterViewInit {
  @HostListener('window:resize') public onResize(): void {
    this.screenSize.width = window.innerWidth;
    this.screenSize.height = window.innerHeight;
    this.camera.aspect = this.screenSize.width / this.screenSize.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.screenSize.width, this.screenSize.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
  }
  @ViewChild('canvas') public canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() public camera: PerspectiveCamera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  @Output() public onCreate = new EventEmitter<MainSettings>();
  @Output() public onBeforeRender = new EventEmitter<void>();

  private readonly screenSize: ScreenSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  private readonly scene = new Scene();
  private renderer!: WebGLRenderer;

  constructor(private readonly threeMainService: ThreeMainService) {}

  ngAfterViewInit(): void {
    this.renderer = new WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
    });

    const initialSettings: MainSettings = {
      screenSize: this.screenSize,
      scene: this.scene,
      canvas: this.canvasRef.nativeElement,
      camera: this.camera,
      renderer: this.renderer,
    };

    this.scene.add(this.camera);
    this.renderer.setSize(this.screenSize.width, this.screenSize.height);
    this.renderer.render(this.scene, this.camera);
    this.threeMainService.init(initialSettings);

    this.onCreate.emit(initialSettings);

    this.renderer.setAnimationLoop(this.animate.bind(this));
  }

  private animate(): void {
    this.onBeforeRender.emit();
    this.renderer.render(this.scene, this.camera);
  }
}
