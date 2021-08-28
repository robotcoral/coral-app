import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { validate } from 'jsonschema';
import { Settings, SettingsSchema } from './settings.schema';

const WORLD_SETTINGS_KEY = 'Settings';
const THEME_KEY = 'Theme';
const LANGUAGE_KEY = 'Language';

export enum THEMES {
  Light = 'light',
  Dark = 'dark',
  Midnight = 'midnight',
}

export enum LANGUAGES {
  German = 'de',
  English = 'en',
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService implements OnInit {
  settings: Settings;
  theme: THEMES | 'auto';
  language: LANGUAGES;

  constructor(
    private window: Window,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadWorldSettings();
    this.saveWorldSettings();
  }

  ngOnInit(): void {
    this.loadGeneralSettings();
  }

  loadWorldSettings() {
    const settingsString = window.localStorage.getItem(WORLD_SETTINGS_KEY);
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

  saveWorldSettings() {
    this.window.localStorage.setItem(
      WORLD_SETTINGS_KEY,
      JSON.stringify(this.settings)
    );
  }

  saveGeneralSettings(theme: THEMES | 'auto', language: LANGUAGES) {
    this.saveTheme(theme);
    this.saveLanguage(language);
  }

  private loadGeneralSettings() {
    const savedTheme = window.localStorage.getItem(THEME_KEY) as THEMES;
    if (Object.values(THEMES).includes(savedTheme)) this.saveTheme(savedTheme);
    this.theme = 'auto';

    this.language =
      navigator.language == LANGUAGES.German
        ? LANGUAGES.German
        : LANGUAGES.English;
  }

  private saveTheme(theme: THEMES | 'auto') {
    if (theme != 'auto') {
      this.theme = theme;

      this.document.documentElement.setAttribute('light-color-scheme', theme);
      this.document.documentElement.setAttribute('dark-color-scheme', theme);
    }

    this.window.localStorage.setItem(THEME_KEY, theme);
  }

  private saveLanguage(language: LANGUAGES) {
    this.document.documentElement.lang = language;

    this.window.localStorage.setItem(LANGUAGE_KEY, language);
  }
}
