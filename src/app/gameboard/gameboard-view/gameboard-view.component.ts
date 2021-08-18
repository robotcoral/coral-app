import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Coordinates3 } from './utils/coordinates.js';
import { OrbitControls } from './utils/OrbitControls.js';
import { Robot } from './utils/robot';
import { World } from './utils/world';

@Component({
  selector: 'app-gameboard-view',
  templateUrl: './gameboard-view.component.html',
  styleUrls: ['./gameboard-view.component.scss'],
})
export class GameboardViewComponent implements AfterViewInit {
  @ViewChild('gameboard')
  gameboardRef: ElementRef;
  gameboard: HTMLElement;
  canvas: HTMLElement;

  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  controls; // OrbitControls
  gridScale = 50;

  world: World;

  robot: Robot;

  ngAfterViewInit(): void {
    this.gameboard = this.gameboardRef.nativeElement;
    this.init();
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

    this.initWorld();
    this.initRobot();

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      this.gameboard.clientWidth,
      this.gameboard.clientHeight
    );
    this.gameboard.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
  }

  initWorld() {
    this.world = new World();
    this.scene.add(this.world);
  }

  initRobot() {
    this.robot = new Robot(this.world);
    this.scene.add(this.robot.mesh);
  }

  resizeWorld(coo: Coordinates3) {
    this.world.resize(coo);
    this.robot.reset();
  }

  reset() {
    this.world.reset();
    this.robot.reset();
  }

  render() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
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
}
