import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  BoxGeometry,
  Color,
  CubeTextureLoader,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
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

  robotGeo: BoxGeometry;
  robotMaterial: MeshBasicMaterial;
  robot: Mesh;
  robotPos = new Vector3(1, 1, 1);
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

    // cubes
    this.robotGeo = new BoxGeometry(50, 50, 50);
    const loader = new CubeTextureLoader();
    loader.setPath('assets/materials/');
    this.robotMaterial = new MeshBasicMaterial({
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

    // grid
    const gridHelper = new GridHelper(1000, 20);
    this.scene.add(gridHelper);

    // robot
    this.robot = new Mesh(this.robotGeo, this.robotMaterial);
    this.robot.position
      .set(0, 0, 0)
      .add(this.robotPos.multiply(new Vector3(25, 25, 25)));
    this.scene.add(this.robot);

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
    this.robot.position.add(this.robotDir.clone().multiply(this.scale));
  }

  rotate(dir = 1) {
    const axis = new Vector3(0, 1, 0);
    const angle = (Math.PI / 2) * dir;
    this.robotDir.applyAxisAngle(axis, angle);
    this.robot.rotateZ(angle);
  }
}
