import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { WorldFile } from "src/app/gameboard/utils";
import { SettingsService } from "./settings";
import { WorldSettings } from "./settings.schema";

/**
 * sessionStorage key for the file settings object
 */
const WORLD_SETTINGS_KEY = "World_Settings";

@Injectable({
  providedIn: "root",
})
export class WorldSettingsService extends SettingsService<WorldSettings> {
  onResize = new Subject<void>();

  constructor(private window: Window) {
    super();
    this.settings = new WorldSettings({});
  }

  /**
   * saves the current state of the settings.fileSettings object to the sessionStorage
   */
  protected saveSettings() {
    this.window.sessionStorage.setItem(
      WORLD_SETTINGS_KEY,
      JSON.stringify(this.settings)
    );
  }

  setSetting(key: keyof WorldSettings, value: any) {
    //@ts-ignore
    this.settings[key] = value;
    this.saveSettings();
  }

  loadWorld(world: WorldFile) {
    const data: Partial<WorldSettings> = world.world_data;
    data.length = world.world_data.dimensions.x;
    data.width = world.world_data.dimensions.y;
    data.height = world.world_data.dimensions.z;

    this.settings = new WorldSettings(data);
    this.onSettingsChange.next(this.settings);
  }
}
