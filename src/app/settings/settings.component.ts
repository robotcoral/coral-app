import { Component } from "@angular/core";
import { InputType } from "./setting/setting.component";
import { SettingsGroup } from "./settings-group/settings-group.component";

@Component({
  selector: "app-settings",
  templateUrl: `./settings.component.html`,
})
export class SettingsComponent {
  settings: SettingsGroup[] = [
    {
      title: "SETTINGS.GENERAL",
      settings: [
        {
          name: "THEME",
          type: InputType.select,
          options: [
            { title: "LIGHT", value: "light" },
            { title: "DARK", value: "dark" },
            { title: "AUTOMATIC", value: "auto" },
          ],
        },
        {
          name: "LANGUAGE",
          type: InputType.select,
          options: [
            { title: "GERMAN", value: "de" },
            { title: "ENGLISH", value: "en" },
            { title: "AUTOMATIC", value: "auto" },
          ],
        },
        {
          name: "TOUCH_UI",
          type: InputType.checkbox,
        },
        { name: "LEGACY_FLAGS", type: InputType.checkbox },
      ],
    },
    {
      title: "SETTINGS.EDITOR",
      settings: [
        { name: "FONT_SIZE", type: InputType.number },
        { name: "TAB_WIDTH", type: InputType.number },
      ],
    },
  ];

  constructor() {}
}
