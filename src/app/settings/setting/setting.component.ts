import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { ClickService } from "src/app/common/click.service";
import { GeneralSettingsService } from "src/app/common/settings/general.settings.service";
import { SettingsKeys } from "src/app/common/settings/settings.schema";
import { WorldSettingsService } from "src/app/common/settings/world.settings";

export enum InputType {
  // Default HTML
  button = "button",
  checkbox = "checkbox",
  color = "color",
  date = "date",
  datetimelocal = "datetime-local",
  email = "email",
  file = "file",
  hidden = "hidden",
  image = "image",
  month = "month",
  number = "number",
  password = "password",
  radio = "radio",
  range = "range",
  reset = "reset",
  search = "search",
  submit = "submit",
  tel = "tel",
  text = "text",
  time = "time",
  url = "url",
  week = "week",
  // Custom
  select = "select",
  textarea = "textarea",
}

type Option = { title: string; value: string; default?: boolean };

export type Setting = {
  name: string;
  type: InputType;
  options?: Option[];
};

@Component({
  selector: "setting",
  templateUrl: "./setting.component.html",
  host: { class: "" },
})
export class SettingComponent implements OnInit {
  @Input()
  setting: Setting;
  @Input()
  groupTitle: string;
  @Input()
  settingsKey: SettingsKeys;
  @HostBinding("class") classList: string;
  @HostBinding("title") title = "";
  @HostListener("click") onClick() {
    this.classList = "setting-selected";
    this.clickService
      .addOutsideListener(this.elementRef.nativeElement)
      .then(() => {
        this.classList = null;
      });
  }

  settingsService: GeneralSettingsService | WorldSettingsService;

  value: string | boolean | number;

  constructor(
    private elementRef: ElementRef,
    private clickService: ClickService,
    private generalSettingsService: GeneralSettingsService,
    private worldSettingsService: WorldSettingsService
  ) {}

  ngOnInit(): void {
    this.settingsService =
      this.settingsKey === SettingsKeys.generalSettings
        ? this.generalSettingsService
        : this.worldSettingsService;
    this.title = this.setting.name.toLowerCase();
    this.loadValue();
    //@ts-ignore
    this.settingsService.onSettingsChange.subscribe(() => this.loadValue());
  }

  change() {
    if (this.setting.type === InputType.number) this.value = +this.value;
    //@ts-ignore
    this.settingsService.setSetting(this.title, this.value);
  }

  checkBoxChange() {
    this.value = !this.value;
    this.change();
  }

  private loadValue() {
    this.value = this.settingsService.settings[this.title];
  }

  get settingPrefix() {
    return `${this.groupTitle}.${this.setting.name}.`;
  }
}
