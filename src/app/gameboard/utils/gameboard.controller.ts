import { Injectable } from '@angular/core';
import { SettingsService } from 'src/app/common/settings.service';
import { UtilService } from 'src/app/common/util.service';
import {
  AdditionalWorldData,
  CARDINALS,
  Coordinates2,
  Coordinates3,
  GameboardModel,
} from '.';
import { WORLDOBJECTTYPES } from '../gameboard-controls/gameboard-controls.component';
import { MaterialColors } from './objects';
import { WorldFile } from './world.schema';

export enum COLORS {
  RED = 'rot',
  GREEN = 'grün',
  BLUE = 'blau',
  YELLOW = 'gelb',
}

export interface PlaceEvent {
  color: COLORS;
  mode: WORLDOBJECTTYPES;
}

@Injectable({
  providedIn: 'root',
})
export class GameboardController {
  private model: GameboardModel;

  constructor(
    private utilService: UtilService,
    public settingService: SettingsService
  ) {
    this.model = new GameboardModel(settingService);
    this.settingService.onThemeChange.subscribe((theme) =>
      this.setTheme(theme.colors)
    );
  }

  move() {
    try {
      this.model.robot.move();
    } catch (error) {
      this.utilService.translateError(error);
    }
  }

  rotate(dir = 1) {
    this.model.robot.rotate(dir);
  }

  place(event: PlaceEvent) {
    try {
      const coo = this.model.robot.getMoveCoordinates();
      if (event.mode == WORLDOBJECTTYPES.SLAB) this.placeSlab(coo, event.color);
      else if (event.mode == WORLDOBJECTTYPES.CUBE)
        this.model.world.placeBlock(coo);
      else
        this.model.world.placeFlag(
          this.model.robot.getCurrentCoordinates(),
          event.color
        );
    } catch (error) {
      this.utilService.translateError(error);
    }
  }

  private placeSlab(coo: Coordinates2, color: COLORS) {
    if (this.settingService.settings.fileSettings.inventoryActive) {
      if (this.model.currentSlabs === 0) throw new Error('ERRORS.NO_SLABS');
      this.model.world.placeSlab(coo, color);
      this.model.currentSlabs--;
    } else {
      this.model.world.placeSlab(coo, color);
    }
  }

  pickUp(mode: WORLDOBJECTTYPES = WORLDOBJECTTYPES.SLAB) {
    try {
      const coo = this.model.robot.getMoveCoordinates();
      if (mode == WORLDOBJECTTYPES.SLAB) {
        this.model.world.pickUpSlab(coo);
        if (this.settingService.settings.fileSettings.inventoryActive)
          this.model.currentSlabs++;
      } else if (mode == WORLDOBJECTTYPES.CUBE) {
        this.model.world.pickUpBlock(coo);
      } else {
        this.model.world.pickUpFlag(this.model.robot.getCurrentCoordinates());
      }
    } catch (error) {
      this.utilService.translateError(error);
    }
  }

  isWall() {
    return this.model.world.outOfBounds(this.model.robot.getMoveCoordinates());
  }

  isSlab(amount = 1) {
    return this.model.world.isStackMinHeight(
      this.model.robot.getMoveCoordinates(),
      amount
    );
  }

  isSlabColor(color: COLORS) {
    return this.model.world.isColor(
      this.model.robot.getMoveCoordinates(),
      color
    );
  }

  isFlag(color?: COLORS): boolean {
    const coo = this.model.robot.getCurrentCoordinates();
    if (color) return this.model.world.flags[coo.x][coo.y].color === color;
    return this.model.world.flags[coo.x][coo.y] != undefined;
  }

  isCardinal(cardinal: CARDINALS): boolean {
    return this.model.robot.isCardinal(cardinal);
  }

  reset(force: boolean = false) {

  }

  resize(coo: Coordinates3) {
    this.model.resize(coo);
  }

  getWorldSize() {
    return this.model.world.getWorldSize();
  }

  getWorld() {
    return this.model.world;
  }

  getRobot() {
    return this.model.robot;
  }

  exportWorld() {

  }

  importWorld() {
    const callback = async (event: Event) => {
      const file: File = (event.target as HTMLInputElement).files[0];
      try {
        if (!file) throw new Error('ERRORS.FILE_UPLOAD_FAILED');

        const worldFile: WorldFile = this.model.import(await file.text());
      } catch (error) {
        this.utilService.translateError(error);
      }
    };
    this.utilService.upload('.coralworld,.json', callback);
  }



  getCurrentSlabs() {
    return this.model.currentSlabs;
  }

  setTheme(theme: MaterialColors) {
    this.model.world.setTheme(theme);
  }
}
