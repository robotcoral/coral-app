import { Component } from "@angular/core";
import { SettingsGroup } from "../settings-group/settings-group.component";

@Component({
  selector: "app-world-settings",
  templateUrl: `./world-settings.component.html`,
})
export class WorldSettingsComponent {
  settings: SettingsGroup[] = [];
}
