import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  AxesHelper,
  Color,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GameboardController } from '../utils';

@Component({
  selector: 'app-gameboard-view',
  templateUrl: './gameboard-view.component.html',
  styleUrls: ['./gameboard-view.component.scss'],
})
export class GameboardViewComponent implements AfterViewInit {
  @ViewChild('gameboard')
  gameboardRef: ElementRef;
  gameboard: HTMLDivElement;
  @ViewChild('inset')
  insetRef: ElementRef;
  inset: HTMLDivElement;
  canvas: HTMLElement;
  gridScale = 50;

  // Main scene
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  controls: OrbitControls;

  // Axes Helper
  axesScene: Scene;
  axesCamera: PerspectiveCamera;
  axesRenderer: WebGLRenderer;

  constructor(private controller: GameboardController) {}

  ngAfterViewInit(): void {
    this.gameboard = this.gameboardRef.nativeElement;
    this.inset = this.insetRef.nativeElement;

    this.init();
    this.setupAxesHelper();
    this.canvas = this.gameboard.getElementsByTagName('canvas')[0];
    this.render();
  }

  init() {
    this.scene = new Scene();
    this.scene.background = new Color(0xffffff);

    this.camera = new PerspectiveCamera(
      45,
      this.gameboard.clientWidth / this.gameboard.clientHeight,
      1,
      10000
    );
    this.camera.position.set(500, 800, 1300);
    this.camera.lookAt(0, 0, 0);

    this.scene.add(this.controller.getRobot().mesh);
    this.scene.add(this.controller.getWorld());

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      this.gameboard.clientWidth,
      this.gameboard.clientHeight
    );
    this.gameboard.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
  }

  render() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();

      this.axesCamera.position.copy(this.camera.position);
      this.axesCamera.position.sub(this.controls.target);
      this.axesCamera.position.setLength(300);
      this.axesCamera.lookAt(this.axesScene.position);

      this.renderer.render(this.scene, this.camera);
      this.axesRenderer.render(this.axesScene, this.axesCamera);
    };
    animate();
  }

  onWindowResize() {
    this.camera.aspect =
      this.gameboard.clientWidth / this.gameboard.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.gameboard.clientWidth,
      this.gameboard.clientHeight
    );
  }

  resetCamera() {
    this.controls.reset();
  }

  setupAxesHelper() {
    this.axesRenderer = new WebGLRenderer({ alpha: true });
    this.axesRenderer.setClearColor(0, 0);
    this.axesRenderer.setSize(this.inset.clientHeight, this.inset.clientWidth);
    this.inset.appendChild(this.axesRenderer.domElement);

    this.axesScene = new Scene();
    this.axesCamera = new PerspectiveCamera(50, 1, 1, 1000);
    this.axesCamera.up = this.camera.up;

    const axes = new AxesHelper(100);
    this.axesScene.add(axes);
  }
}
