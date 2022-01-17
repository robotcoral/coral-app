import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ClickService } from "src/app/common/click.service";
import { SettingsKeys } from "src/app/common/settings/settings.schema";
import { Setting } from "../setting/setting.component";

export type SettingsGroup = {
  title: string;
  settings: Setting[];
};

@Component({
  selector: "settings-group",
  templateUrl: "./settings-group.component.html",
})
export class SettingsGroupComponent {
  @Input()
  group: SettingsGroup;
  @Input()
  settingsKey: SettingsKeys;
  @ViewChild("title")
  elementRef: ElementRef;

  active = false;

  constructor(private clickService: ClickService) {}

  onClick() {
    this.active = true;
    this.clickService
      .addOutsideListener(this.elementRef.nativeElement)
      .then(() => {
        this.active = false;
      });
  }
}
