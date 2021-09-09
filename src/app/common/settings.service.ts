import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    @Inject(DOCUMENT) private document: Document,
    private translationService: TranslateService
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
    if (theme != this.theme) {
      this.saveTheme(theme);
    }
    if (language != this.language) {
      this.applyLanguage(language);
    }
  }

  private loadGeneralSettings() {
    const savedTheme = window.localStorage.getItem(THEME_KEY) as THEMES;
    if (Object.values(THEMES).includes(savedTheme)) this.applyTheme(savedTheme);
    else this.theme = 'auto';

    let savedLanguage = window.localStorage.getItem(LANGUAGE_KEY) as LANGUAGES;
    if (!Object.values(LANGUAGES).includes(savedLanguage))
      savedLanguage =
        navigator.language == LANGUAGES.German
          ? LANGUAGES.German
          : LANGUAGES.English;
    this.applyLanguage(savedLanguage);
  }

  private saveTheme(theme: THEMES | 'auto') {
    this.applyTheme(theme);

    const transitionTime: number = 0.5;

    // start theme transition
    document.body.style.setProperty("--theme-transition-time", transitionTime.toString() + "s");

    // end theme transition
    setTimeout(() => {
      document.body.style.removeProperty("--theme-transition-time");
    }, transitionTime * 1000)
  }

  private applyTheme(theme: THEMES | 'auto') {
    this.theme = theme;

    if (theme != 'auto') {
      this.document.documentElement.setAttribute('light-color-scheme', theme);
      this.document.documentElement.setAttribute('dark-color-scheme', theme);
    } else {
      this.document.documentElement.setAttribute('light-color-scheme', 'light');
      this.document.documentElement.setAttribute('dark-color-scheme', 'dark');
    }

    this.window.localStorage.setItem(THEME_KEY, theme);
  }

  private applyLanguage(language: LANGUAGES) {
    this.language = language;
    this.document.documentElement.lang = language;

    this.window.localStorage.setItem(LANGUAGE_KEY, language);
    this.translationService.use(this.language);
  }
}
