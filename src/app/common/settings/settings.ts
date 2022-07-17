import { Subject } from "rxjs";
import { GeneralSettings, WorldSettings } from "./settings.schema";

export abstract class SettingsService<
  SettingsType extends GeneralSettings | WorldSettings
> {
  settings: SettingsType;
  onSettingsChange: Subject<SettingsType> = new Subject();

  abstract setSetting(key: keyof SettingsType, value: any): void;
  protected abstract saveSettings(): void;
}
