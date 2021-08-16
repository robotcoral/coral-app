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
import { Block, Slab } from './utils/objects';
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
  gridSize = { x: 9, y: 10, z: 5 };
  gridScale = 50;
  world: (Slab[] | Block)[][];

  robot: Mesh;
  robotPos = new Vector3(0, 0, 0);
  robotDir = new Vector3(1, 0, 0);

  offsetVector: Vector3;

  ngAfterViewInit(): void {
    this.gameboard = this.gameboardRef.nativeElement;
    this.init();
    this.initWorld();
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

  initWorld() {
    this.world = [];
    for (var i = 0; i < this.gridSize.x; i++)
      this.world.push(new Array(this.gridSize.y));
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

    this.offsetVector = new Vector3(
      (this.gridSize.x / 2 - 0.5) * -this.gridScale,
      0,
      (this.gridSize.y / 2 - 0.5) * -this.gridScale
    );
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

    this.robot.position.set(0, 0, 0).add(this.offsetVector);

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
    console.log(this.world);
    if (this.outOfBounds()) return console.error('Out of bounds');
    this.robotPos.add(this.robotDir);
    this.robot.position.addScaledVector(this.robotDir, this.gridScale);
  }

  outOfBounds() {
    const moveTo = this.robotPos.clone().add(this.robotDir);
    return (
      moveTo.x >= this.gridSize.x ||
      moveTo.x < 0 ||
      moveTo.z >= this.gridSize.y ||
      moveTo.z < 0
    );
  }

  placeSlab(color: string) {
    if (this.outOfBounds()) return console.error('Out of bounds');
    const destVector = this.robotPos.clone().add(this.robotDir);
    var dest = this.world[destVector.x][destVector.z];
    if (dest instanceof Block) {
      return console.error('Blocked');
    } else {
      if (dest?.length >= this.gridSize.z) return console.error('Max Height');
      if (!dest) dest = [];

      const slab = new Slab(this.gridScale, color);
      const height = dest.push(slab);
      destVector.y = -0.75 + 0.5 * height;
      slab.position
        .add(this.offsetVector)
        .addScaledVector(destVector, this.gridScale);
      this.scene.add(slab);

      this.world[destVector.x][destVector.z] = dest;
    }
  }

  placeBlock() {
    if (this.outOfBounds()) return console.error('Out of bounds');
    const destVector = this.robotPos.clone().add(this.robotDir);
    var dest = this.world[destVector.x][destVector.z];
    if (dest instanceof Array) {
      return console.error('Blocked');
    } else {
      dest = new Block(this.gridScale);
      dest.position
        .add(this.offsetVector)
        .addScaledVector(destVector, this.gridScale);
      this.scene.add(dest);

      this.world[destVector.x][destVector.z] = dest;
    }
  }

  pickUpSlab() {
    if (this.outOfBounds()) return console.error('Out of bounds');
    const destVector = this.robotPos.clone().add(this.robotDir);
    var dest = this.world[destVector.x][destVector.z];
    if (dest instanceof Block) {
      return console.error('Blocked');
    } else {
      if (!dest) return console.error('Nothing to pick up');

      this.scene.remove(dest.pop());
      this.world[destVector.x][destVector.z] = dest.length ? dest : undefined;
    }
  }

  rotate(dir = 1) {
    this.robotDir.multiply(new Vector3(0 - dir, 0, 0 + dir));
    [this.robotDir.x, this.robotDir.z] = [this.robotDir.z, this.robotDir.x];
  }
}
