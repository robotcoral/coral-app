import { Injectable } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { EditorController } from "src/app/common/editor.controller";
import { GeneralSettingsService } from "src/app/common/settings/general.settings.service";
import { WorldSettingsService } from "src/app/common/settings/world.settings";
import { UtilService } from "src/app/common/util.service";
import { ConfirmComponent } from "src/app/modals/confirm.component";
import {
  CARDINALS,
  Coordinates2,
  Coordinates3,
  GameboardModel,
  InventoryData,
} from ".";
import { WORLDOBJECTTYPES } from "../gameboard-controls/gameboard-controls.component";
import { MaterialColors } from "./objects";
import { AdditionalWorldData, WorldFile } from "./world.schema";

export enum COLORS {
  RED = "rot",
  GREEN = "grün",
  BLUE = "blau",
  YELLOW = "gelb",
}

export interface PlaceEvent {
  color: COLORS;
  mode: WORLDOBJECTTYPES;
}

@Injectable({
  providedIn: "root",
})
export class GameboardController {
  private model: GameboardModel;

  constructor(
    private utilService: UtilService,
    public generalSettingService: GeneralSettingsService,
    public worldSettingService: WorldSettingsService,
    public modalService: SimpleModalService,
    private editorController: EditorController
  ) {
    this.model = new GameboardModel(worldSettingService);
    this.generalSettingService.onThemeChange.subscribe((theme) =>
      this.setTheme(theme.colors)
    );
    this.worldSettingService.onResize.subscribe(() => this.resize());
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
    if (this.worldSettingService.settings.inventory_active) {
      if (this.model.currentSlabs === 0) throw new Error("ERRORS.NO_SLABS");
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
        if (this.worldSettingService.settings.inventory_active)
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
    if (force) return this.model.reset();
    this.modalService
      .addModal(ConfirmComponent, {
        title: "MODALS.RESET_WORLD.TITLE",
        message: "MODALS.RESET_WORLD.DESCRIPTION",
      })
      .subscribe((reset) => {
        if (reset) this.model.reset();
      });
  }

  resize() {
    const coo: Coordinates3 = {
      x: this.worldSettingService.settings.length,
      y: this.worldSettingService.settings.width,
      z: this.worldSettingService.settings.height,
    };
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
    const data: AdditionalWorldData & InventoryData = {
      name: this.worldSettingService.settings.name,
      author: this.worldSettingService.settings.author,
      description: this.worldSettingService.settings.description,
      inventory_active: this.worldSettingService.settings.inventory_active,
      max_slabs: this.worldSettingService.settings.max_slabs,
      start_slabs: this.worldSettingService.settings.start_slabs,
    };
    const code = this.worldSettingService.settings.export_code
      ? this.editorController.exportToString()
      : null;

    const worldFile = this.model.export(data, code);
    const text = JSON.stringify(worldFile, null, 2);
    this.utilService.dyanmicDownloadByHtmlTag({
      title: "world.coralworld",
      content: text,
      fileType: "text/json",
    });
  }

  importWorld() {
    const callback = async (event: Event) => {
      const file: File = (event.target as HTMLInputElement).files[0];
      try {
        if (!file) throw new Error("ERRORS.FILE_UPLOAD_FAILED");

        const worldFile: WorldFile = this.model.import(await file.text());
        this.model.world.defaultWorld = worldFile.world_data;
        this.worldSettingService.loadWorld(worldFile);
        this.model.reset();

        if (worldFile.code) {
          this.modalService
            .addModal(ConfirmComponent, {
              title: "MODALS.IMPORT_CODE.TITLE",
              message: "MODALS.IMPORT_CODE.DESCRIPTION",
            })
            .subscribe((load) => {
              if (load) this.editorController.setState(worldFile.code);
            });
        }
      } catch (error) {
        this.utilService.translateError(error);
      }
    };
    this.utilService.upload(callback);
  }

  getCurrentSlabs() {
    return this.model.currentSlabs;
  }

  setTheme(theme: MaterialColors) {
    this.model.world.setTheme(theme);
  }
}
