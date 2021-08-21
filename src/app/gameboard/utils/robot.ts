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
  world: World;

  constructor(world: World) {
    this.world = world;
    this.init();
  }

  private init() {
    const robotGeo = new BoxGeometry(
      this.world.gridScale,
      this.world.gridScale,
      this.world.gridScale
    );

    const loader = new CubeTextureLoader();
    loader.setPath('assets/materials/');
    const robotMaterial = new MeshBasicMaterial({
      color: 0x8a8a8a,
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
    return { x: moveVector.x, y: moveVector.z, z: moveVector.y * 2 };
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

  getCardinal(): CARDINALS {
    if (this.direction.z === -1) return CARDINALS.NORTH;
    if (this.direction.z === 1) return CARDINALS.SOUTH;
    if (this.direction.x === 1) return CARDINALS.EAST;
    if (this.direction.x === -1) return CARDINALS.WEST;
    return null;
  }

  setPosition(coo: Coordinates3) {
    this.position = new Vector3(coo.x, coo.z / 2, coo.y);
    this.mesh.position
      .set(0, 0, 0)
      .add(this.world.offsetVector)
      .addScaledVector(this.position, this.world.gridScale);
    return this;
  }

  setDirection(direction: CARDINALS) {
    const vector = new Vector3(0, 0, 0);
    if (direction === CARDINALS.NORTH) vector.z = -1;
    if (direction === CARDINALS.SOUTH) vector.z = 1;
    if (direction === CARDINALS.EAST) vector.x = 1;
    if (direction === CARDINALS.WEST) vector.x = -1;
    return this;
  }
}
