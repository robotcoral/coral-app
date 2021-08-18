import {
  BoxGeometry,
  CubeTextureLoader,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three';
import { CARDINALS, Coordinates3 } from './coordinates';
import { World } from './world';

export class Robot {
  mesh: Mesh;
  position: Vector3;
  direction: Vector3;

  constructor(private world: World) {
    this.init();
  }

  init() {
    const robotGeo = new BoxGeometry(
      this.world.gridScale,
      this.world.gridScale,
      this.world.gridScale
    );

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
    this.mesh = new Mesh(robotGeo, robotMaterial);
    this.reset();
  }

  reset() {
    this.mesh.position.set(0, 0, 0).add(this.world.offsetVector);
    this.direction = new Vector3(0, 0, 1);
    this.position = new Vector3(0, 0, 0);
  }

  getMoveCoordinates(): Coordinates3 {
    const moveVector = this.position.clone().add(this.direction);
    return { x: moveVector.x, y: moveVector.z, z: this.direction.y * 2 };
  }

  getCurrentCoordinates(): Coordinates3 {
    return { x: this.position.x, y: this.position.z, z: this.position.y };
  }

  move() {
    const coo = this.getMoveCoordinates();
    this.world.collision(coo);
    this.direction.y = (this.world.height(coo) - this.position.y * 2) * 0.5;
    this.position.add(this.direction);
    this.mesh.position.addScaledVector(this.direction, this.world.gridScale);
  }

  rotate(dir = 1) {
    this.direction.multiply(new Vector3(0 - dir, 0, 0 + dir));
    [this.direction.x, this.direction.z] = [this.direction.z, this.direction.x];
  }

  isCardinal(cardinal: CARDINALS): boolean {
    return this.getCardinal() === cardinal;
  }

  private getCardinal(): CARDINALS {
    if (this.direction.x === 1) return CARDINALS.NORTH;
    if (this.direction.x === -1) return CARDINALS.SOUTH;
    if (this.direction.y === 1) return CARDINALS.EAST;
    if (this.direction.y === 1) return CARDINALS.WEST;
    return null;
  }
}
