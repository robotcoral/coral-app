import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements AfterViewInit {
  @ViewChild('gameboard')
  gameboardRef: ElementRef;
  gameboard: HTMLElement;
  canvas: HTMLElement;
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  geometry: BoxGeometry;
  material: MeshBasicMaterial;
  cube: Mesh;

  ngAfterViewInit(): void {
    this.gameboard = this.gameboardRef.nativeElement;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(
      this.gameboard.clientWidth,
      this.gameboard.clientHeight
    );
    this.gameboard.appendChild(this.renderer.domElement);

    this.geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.canvas = this.gameboard.getElementsByTagName('canvas')[0];

    const animate = () => {
      requestAnimationFrame(animate);

      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
