import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  BoxGeometry,
  Color,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
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
  rollOverMaterial: MeshBasicMaterial;
  rollOverMesh: Mesh;
  cubeGeo: BoxGeometry;
  cubeMaterial: MeshLambertMaterial;
  controls;

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
    this.cubeGeo = new BoxGeometry(50, 50, 50);
    this.cubeMaterial = new MeshLambertMaterial({ color: 0xfeb74c });

    // grid
    const gridHelper = new GridHelper(1000, 20);
    this.scene.add(gridHelper);

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
}
