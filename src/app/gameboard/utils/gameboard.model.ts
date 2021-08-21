import {
  AdditionalWorldData,
  Coordinates3,
  Robot,
  World,
  WorldExport,
  WorldImport,
} from '.';

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

  export(data: AdditionalWorldData) {
    return WorldExport.export(this.world, this.robot, data);
  }

  import(world: string) {
    return WorldImport.import(world);
  }
}
