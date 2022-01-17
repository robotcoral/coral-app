import { Component } from "@angular/core";
import { SettingsKeys } from "src/app/common/settings/settings.schema";
import { WorldSettingsService } from "src/app/common/settings/world.settings";
import { GameboardController } from "src/app/gameboard/utils";
import { AppSettingsComponents } from "../app-settings.component";
import { InputType } from "../setting/setting.component";
import { SettingsGroup } from "../settings-group/settings-group.component";

@Component({
  selector: "app-world-settings",
  templateUrl: `./world-settings.component.html`,
})
export class WorldSettingsComponent extends AppSettingsComponents {
  settings: SettingsGroup[] = [
    {
      title: "SETTINGS.WORLD_INFO",
      settings: [
        { name: "NAME", type: InputType.text },
        { name: "AUTHOR", type: InputType.text },
        { name: "DESCRIPTION", type: InputType.textarea },
        { name: "EXPORT_CODE", type: InputType.checkbox },
      ],
    },
    {
      title: "SETTINGS.WORLD_SETTINGS",
      settings: [
        { name: "WIDTH", type: InputType.number },
        { name: "LENGTH", type: InputType.number },
        { name: "HEIGHT", type: InputType.number },
        { name: "RESET", type: InputType.checkbox },
      ],
    },
    {
      title: "SETTINGS.INVENTORY_SETTINGS",
      settings: [
        { name: "INVENTORY_ACTIVE", type: InputType.checkbox },
        { name: "MAX_SLABS", type: InputType.number },
        { name: "START_SLABS", type: InputType.number },
      ],
    },
  ];

  settingsKey = SettingsKeys.worldSetting;

  constructor(
    private settingsService: WorldSettingsService,
    private controller: GameboardController
  ) {
    super();
  }

  apply() {
    this.settingsService.onResize.next();
  }

  import() {
    this.controller.importWorld();
  }

  export() {
    this.controller.exportWorld();
  }
}
