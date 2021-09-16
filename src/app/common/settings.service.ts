import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { validate } from 'jsonschema';
import { Subject } from 'rxjs';
import { COLORS, MaterialColors } from '../gameboard/utils';
import { Settings, SettingsSchema } from './settings.schema';

const SETTINGS_KEY = 'Settings';
const THEME_KEY = 'Theme';
const LANGUAGE_KEY = 'Language';

export interface GameboardTheme {
  background: string;
  colors: MaterialColors;
}

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
  onThemeChange: Subject<GameboardTheme> = new Subject();
  gameboardTheme: GameboardTheme;
  onEditorSettingsChange: Subject<Settings> = new Subject();

  constructor(
    private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private translationService: TranslateService
  ) {
    this.loadSettings();
    this.saveSettings();

    this.window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => this.triggerThemeChange());
  }

  ngOnInit(): void {
    this.loadMiscSettings();
    this.triggerThemeChange();
    this.onEditorSettingsChange.next(this.settings);
  }

  loadSettings() {
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

  saveSettings() {
    this.window.localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(this.settings)
    );
  }

  saveMiscSettings(theme: THEMES | 'auto', language: LANGUAGES) {
    if (theme != this.theme) {
      this.saveTheme(theme);
    }
    if (language != this.language) {
      this.applyLanguage(language);
    }
  }

  saveEditorSettings(fontSize: number, tabWidth: number) {
    this.settings.fontSize = fontSize;
    this.settings.tabWidth = tabWidth;
    this.onEditorSettingsChange.next(this.settings);
  }

  private loadMiscSettings() {
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
    const transitionTime: number = 0.5;

    // start theme transition
    document.body.style.setProperty(
      '--theme-transition-time',
      transitionTime.toString() + 's'
    );

    // end theme transition
    setTimeout(() => {
      document.body.style.removeProperty('--theme-transition-time');
    }, transitionTime * 1000);

    this.applyTheme(theme);
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
    this.triggerThemeChange();
  }

  private applyLanguage(language: LANGUAGES) {
    this.language = language;
    this.document.documentElement.lang = language;

    this.window.localStorage.setItem(LANGUAGE_KEY, language);
    this.translationService.use(this.language);
  }

  private triggerThemeChange() {
    const style = getComputedStyle(this.document.body);

    this.gameboardTheme = {
      colors: {
        [COLORS.RED]: style.getPropertyValue('--gb-red'),
        [COLORS.GREEN]: style.getPropertyValue('--gb-green'),
        [COLORS.BLUE]: style.getPropertyValue('--gb-blue'),
        [COLORS.YELLOW]: style.getPropertyValue('--gb-yellow'),
      },
      background: style.getPropertyValue('--theme-main-bg-color'),
    };

    this.onThemeChange.next(this.gameboardTheme);
  }

  public setSpeed(speed: number) {
    this.settings.executionSpeed = speed;
    this.saveSettings();
  }
}
