import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CARDINALS, Coordinates3 } from './coordinates';
import { World } from './world';

export class Robot {
  robot: Group = new Group();
  position: Vector3;
  direction: Vector3;
  world: World;

  constructor(world: World) {
    this.world = world;
    this.init();
  }

  private init() {
    const loader = new GLTFLoader();

    const scale = 20;

    loader.load(
      'assets/robot/Companion-bot.gltf',
      (gltf) => {
        this.robot.add(gltf.scene);
        this.robot.scale.set(scale, scale, scale);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    this.reset();
  }

  reset() {
    if (this.world.defaultWorld.starting_position) {
      const coo = this.world.defaultWorld.starting_position;
      this.setPosition(coo);
    } else {
      this.setPosition({ x: 0, y: 0, z: 0 });
    }
    if (this.world.defaultWorld.starting_rotation) {
      this.setDirection(this.world.defaultWorld.starting_rotation);
    } else {
      this.setDirection(CARDINALS.SOUTH);
    }
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
    this.robot.position.addScaledVector(this.direction, this.world.gridScale);
    this.direction.y = 0;
  }

  rotate(dir = 1) {
    this.direction.multiply(new Vector3(0 - dir, 0, 0 + dir));
    [this.direction.x, this.direction.z] = [this.direction.z, this.direction.x];

    this.robot.rotateY(dir * (Math.PI / 2));
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
    this.robot.position.set(0, -25, 0);
    this.robot.position
      .add(this.world.offsetVector)
      .addScaledVector(this.position, this.world.gridScale);
    return this;
  }

  setDirection(direction: CARDINALS) {
    const vector = new Vector3(0, 0, 0);
    this.robot.rotation.x = 0;
    this.robot.rotation.z = 0;
    switch (direction) {
      case CARDINALS.NORTH:
        vector.z = -1;
        this.robot.rotation.y = Math.PI;
        break;
      case CARDINALS.SOUTH:
        vector.z = 1;
        this.robot.rotation.y = 0;
        break;
      case CARDINALS.EAST:
        vector.x = 1;
        this.robot.rotation.y = Math.PI / 2;
        break;
      default:
        vector.x = -1;
        this.robot.rotation.y = -Math.PI / 2;
    }
    this.direction = vector;
    return this;
  }
}
