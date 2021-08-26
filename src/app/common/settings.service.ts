import { Injectable } from '@angular/core';
import { validate } from 'jsonschema';
import { Settings, SettingsSchema } from './settings.schema';

const SETTINGS_KEY = 'Settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings;

  constructor(private window: Window) {
    this.load();
    this.save();
  }

  load() {
    const settingsString = window.localStorage.getItem(SETTINGS_KEY);
    if (settingsString == null) {
      this.settings = new Settings({});
      return;
    }

    const settingsObject = JSON.parse(settingsString) as Settings;
    const errors = validate(settingsObject, SettingsSchema).errors;
    if (errors.length) {
      console.error(errors);
      this.settings = new Settings({});
      return;
    }

    this.settings = new Settings(settingsObject);
  }

  save() {
    this.window.localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(this.settings)
    );
  }
}
