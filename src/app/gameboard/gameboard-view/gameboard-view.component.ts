import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  BoxGeometry,
  Color,
  CubeTextureLoader,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { CARDINALS } from '../gameboard.component';
import { OrbitControls } from './utils/OrbitControls.js';
import { Coordinates3, World } from './utils/world';

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

  robot: Mesh;
  robotPos = new Vector3(0, 0, 0);
  robotDir = new Vector3(1, 0, 0);

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

    this.robot.position.set(0, 0, 0).add(this.world.offsetVector);

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
    const coo = this.getMoveCoordinates();
    this.world.collision(coo);
    this.robotDir.y = (this.world.height(coo) - this.robotPos.y * 2) * 0.5;
    this.robotPos.add(this.robotDir);
    this.robot.position.addScaledVector(this.robotDir, this.gridScale);
  }

  getMoveCoordinates(): Coordinates3 {
    const moveVector = this.robotPos.clone().add(this.robotDir);
    return { x: moveVector.x, y: moveVector.z, z: this.robotPos.y * 2 };
  }

  rotate(dir = 1) {
    this.robotDir.multiply(new Vector3(0 - dir, 0, 0 + dir));
    [this.robotDir.x, this.robotDir.z] = [this.robotDir.z, this.robotDir.x];
  }

  isCardinal(cardinal: CARDINALS): boolean {
    return this.getCardinal() === cardinal;
  }

  private getCardinal(): CARDINALS {
    if (this.robotDir.x === 1) return CARDINALS.NORTH;
    if (this.robotDir.x === -1) return CARDINALS.SOUTH;
    if (this.robotDir.y === 1) return CARDINALS.EAST;
    if (this.robotDir.y === 1) return CARDINALS.WEST;
    return null;
  }
}
