import { SettingsService } from 'src/app/common/settings.service';
import {
  AdditionalWorldData,
  Coordinates3,
  Robot,
  World,
  WorldExport,
  WorldImport,
} from '.';
import { WorldData } from './world.schema';

export class GameboardModel {
  world: World;
  robot: Robot;
  currentSlabs: number;

  constructor(private settingsService: SettingsService) {
    this.world = new World();
    this.robot = new Robot(this.world);
    this.currentSlabs = this.settingsService.settings.startSlabs;
  }

  reset() {
    this.world.reset();
    this.robot.reset();
    this.currentSlabs = this.settingsService.settings.startSlabs;
  }

  resize(coo: Coordinates3) {
    this.world.resize(coo);
    this.robot.reset();
    this.currentSlabs = this.settingsService.settings.startSlabs;
  }

  export(data: AdditionalWorldData) {
    return WorldExport.export(this.world, this.robot, data);
  }

  import(world: string) {
    return WorldImport.import(world);
  }

  save(data: WorldData) {
    this.world.defaultWorld = data;
  }
}
