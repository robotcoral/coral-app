import { Coordinates3 } from './coordinates';
import { Robot } from './robot';
import { World } from './world';
import { WorldExport, WorldImport } from './world.import.export';

export class GameboardModel {
  world: World;
  robot: Robot;

  constructor() {
    this.world = new World();
    this.robot = new Robot(this.world);
  }

  reset() {
    this.world.reset();
    this.robot.reset();
  }

  resize(coo: Coordinates3) {
    this.world.resize(coo);
    this.robot.reset();
  }

  export() {
    return WorldExport.export(this.world, this.robot);
  }

  import(world: string) {
    WorldImport.import(world, this.world, this.robot);
  }
}
