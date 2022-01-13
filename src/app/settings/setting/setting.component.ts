import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { ClickService } from "src/app/common/click.service";
import { SettingsService } from "src/app/common/settings.service";

export enum InputType {
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
  select = "select",
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

  value: string | boolean;

  constructor(
    private elementRef: ElementRef,
    private clickService: ClickService,
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.title = this.setting.name.toLowerCase();
    this.value = this.settingsService.settings.globalSettings[this.title];
  }

  change() {
    this.settingsService.setSetting(this.title, this.value);
  }

  checkBoxChange() {
    this.value = !this.value;
    this.change();
  }

  get settingPrefix() {
    return `${this.groupTitle}.${this.setting.name}.`;
  }
}
