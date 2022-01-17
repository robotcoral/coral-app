import { Component, HostBinding } from "@angular/core";
import { SettingsKeys } from "../common/settings/settings.schema";
import { SettingsGroup } from "./settings-group/settings-group.component";

@Component({
  template: "",
})
export class AppSettingsComponents {
  @HostBinding("class") classList = "app-settings";

  settings: SettingsGroup[];
  settingsKey: SettingsKeys;
}
