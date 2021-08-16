import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  BoxGeometry,
  Color,
  CubeTextureLoader,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Grid } from './utils/grid';
import { OrbitControls } from './utils/OrbitControls.js';

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
  grid: Object3D;
  gridSize = { x: 9, y: 10 };
  gridScale = 50;

  robot: Mesh;
  robotPos = new Vector3(0, 0, 0);
  robotDir = new Vector3(1, 0, 0);

  scale = new Vector3(50, 50, 50);

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

    // grid
    this.initGrid();

    // robot
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

  initGrid() {
    this.grid = new Grid({
      height: this.gridSize.x,
      width: this.gridSize.y,
      cellHeight: this.gridScale,
      cellWidth: this.gridScale,
      color: 0x444444,
      zOffset: -25,
    });
    this.scene.add(this.grid);
  }

  initRobot() {
    const robotGeo = new BoxGeometry(50, 50, 50);

    const loader = new CubeTextureLoader();
    loader.setPath('assets/materials/');
    const robotMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      envMap: loader.load([
        'side.png',
        'face.png',
        'side.png',
        'side.png',
        'side.png',
        'side.png',
      ]),
    });
    this.robot = new Mesh(robotGeo, robotMaterial);

    const offsetVector = new Vector3(
      (this.gridSize.x / 2 - 0.5) * -this.gridScale,
      0,
      (this.gridSize.y / 2 - 0.5) * -this.gridScale
    );
    this.robot.position.set(0, 0, 0).add(offsetVector);

    this.scene.add(this.robot);
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

  move() {
    if (this.moveOutOfBounds()) return console.error('Out of bounds');
    this.robotPos.add(this.robotDir);
    this.robot.position.add(this.robotDir.clone().multiply(this.scale));
  }

  moveOutOfBounds() {
    const moveTo = this.robotPos.clone().add(this.robotDir);
    return (
      moveTo.x >= this.gridSize.x ||
      moveTo.x < 0 ||
      moveTo.z >= this.gridSize.y ||
      moveTo.z < 0
    );
  }

  rotate(dir = 1) {
    this.robotDir.multiply(new Vector3(0 - dir, 0, 0 + dir));
    [this.robotDir.x, this.robotDir.z] = [this.robotDir.z, this.robotDir.x];
  }
}
