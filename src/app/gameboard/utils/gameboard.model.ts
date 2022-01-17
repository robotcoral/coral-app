import { WorldSettingsService } from "src/app/common/settings/world.settings";
import {
  AdditionalWorldData,
  Coordinates3,
  Robot,
  World,
  WorldExport,
  WorldImport,
} from ".";
import { WorldData } from "./world.schema";

export class GameboardModel {
  world: World;
  robot: Robot;
  currentSlabs: number;

  constructor(private settingsService: WorldSettingsService) {
    this.world = new World();
    this.robot = new Robot(this.world);
    this.currentSlabs = this.settingsService.settings.start_slabs;
  }

  reset() {
    this.world.reset();
    this.robot.reset();
    this.currentSlabs = this.settingsService.settings.start_slabs;
  }

  resize(coo: Coordinates3) {
    this.world.resize(coo);
    this.robot.reset();
    this.currentSlabs = this.settingsService.settings.start_slabs;
  }

  export(data: AdditionalWorldData, code: string) {
    return WorldExport.export(this.world, this.robot, data, code);
  }

  import(world: string) {
    return WorldImport.import(world);
  }

  save(data: WorldData) {
    this.world.defaultWorld = data;
  }
}
