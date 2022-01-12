import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { validate } from "jsonschema";
import { Subject } from "rxjs";
import { COLORS, MaterialColors } from "../gameboard/utils";
import {
  GlobalSettings,
  GlobalSettingsSchema,
  LANGUAGES,
  LANGUAGE_CODES,
  Settings,
  THEMES,
  TOUCH_UI,
} from "./settings.schema";

/**
 * localStorage key for the global settings object
 */
const GLOBAL_SETTINGS_KEY = "Settings";

/**
 * sessionStorage key for the file settings object
 */
const FILE_SETTINGS_KEY = "World_Settings";

export interface GameboardTheme {
  background: string;
  colors: MaterialColors;
}

@Injectable({
  providedIn: "root",
})
export class SettingsService implements OnInit {
  settings: Settings;
  onThemeChange: Subject<GameboardTheme> = new Subject();
  gameboardTheme: GameboardTheme;
  onEditorSettingsChange: Subject<Partial<GlobalSettings>> = new Subject();

  constructor(
    private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private translationService: TranslateService
  ) {
    this.loadSettings();
    this.repairInvalidSettings();
    this.saveSettings();

    this.window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => this.triggerCanvasThemeChange());
  }

  ngOnInit(): void {
    this.applyUISettings();
    this.triggerCanvasThemeChange();
  }

  // load function

  /**
   * loads the settings defined in the localStorage into the settings object.
   * If any errors were found, the settings object is created with the default values
   * @returns undefined
   */
  loadSettings() {
    const globalSettingsString =
      window.localStorage.getItem(GLOBAL_SETTINGS_KEY);

    if (globalSettingsString == null) {
      this.settings = new Settings({}, {});
      return;
    }

    const globalSettingsObject = JSON.parse(
      globalSettingsString
    ) as GlobalSettings;
    const errors = validate(globalSettingsObject, GlobalSettingsSchema).errors;
    if (errors.length) {
      console.error(errors);
      this.settings = new Settings({}, {});
      return;
    }

    this.settings = new Settings(globalSettingsObject, {});
  }

  /**
   * fixes possible errors in the settings object,
   * e.g. "fr" is a valid string for the language, but because it
   * hasn't been implemented yet, it is considered an error
   */
  repairInvalidSettings() {
    if (!Object.values(THEMES).includes(this.settings.globalSettings.theme)) {
      this.settings.globalSettings.theme = THEMES.Auto;
    }

    if (!LANGUAGE_CODES[this.settings.globalSettings.language]) {
      if (LANGUAGE_CODES[navigator.language]) {
        this.settings.globalSettings.language =
          LANGUAGES[LANGUAGE_CODES[navigator.language]];
      } else {
        this.settings.globalSettings.language = LANGUAGES.English;
      }
    }
  }

  // save functions

  /**
   * calls saveGlobalSettings() and saveFileSettings() which save the settings to the localStorage/sessionStorage
   */
  saveSettings() {
    this.saveGlobalSettings();
    this.saveFileSettings();
  }

  /**
   * saves the current state of the settings.globalSettings object to the localStorage
   */
  saveGlobalSettings() {
    this.window.localStorage.setItem(
      GLOBAL_SETTINGS_KEY,
      JSON.stringify(this.settings.globalSettings)
    );
  }

  /**
   * saves the current state of the settings.fileSettings object to the sessionStorage
   */
  saveFileSettings() {
    this.window.sessionStorage.setItem(
      FILE_SETTINGS_KEY,
      JSON.stringify(this.settings.fileSettings)
    );
  }

  // apply functions

  /**
   * applies the state defined in settings.globalSettings to the UI
   */
  applyUISettings() {
    this.applyTheme();
    this.applyLanguage();
    this.applyTouchUI();
  }

  /**
   * applies the theme defined in settings.globalSettings.theme to the UI
   */
  private applyTheme() {
    if (this.settings.globalSettings.theme != "auto") {
      this.document.documentElement.setAttribute(
        "light-theme",
        this.settings.globalSettings.theme
      );
      this.document.documentElement.setAttribute(
        "dark-theme",
        this.settings.globalSettings.theme
      );
    } else {
      this.document.documentElement.setAttribute("light-theme", "light");
      this.document.documentElement.setAttribute("dark-theme", "dark");
    }
    this.triggerCanvasThemeChange();
  }

  /**
   * activates/deactivates the touchUI depending on the setting in settings.globalSettings.touchUIActive
   */
  private applyTouchUI() {
    if (this.settings.globalSettings.touch_ui) {
      this.document.documentElement.setAttribute("touch-ui", "true");
    } else {
      this.document.documentElement.setAttribute("touch-ui", "false");
    }
  }

  /**
   * applies the language defined in settings.globalSettings.language to the UI
   */
  private applyLanguage() {
    let realLang: LANGUAGES;
    if (this.settings.globalSettings.language == LANGUAGES.Auto) {
      if (LANGUAGE_CODES[navigator.language]) {
        realLang = LANGUAGES[LANGUAGE_CODES[navigator.language]];
      } else {
        realLang = LANGUAGES.English;
      }
    } else {
      realLang = this.settings.globalSettings.language;
    }
    this.document.documentElement.lang = realLang;
    this.translationService.use(realLang);
    this.onEditorSettingsChange.next({
      language: realLang,
    });
  }

  /**
   * applies the current theme to the 3d viewport
   */
  private triggerCanvasThemeChange() {
    const style = getComputedStyle(this.document.body);

    this.gameboardTheme = {
      colors: {
        [COLORS.RED]: style.getPropertyValue("--gb-red"),
        [COLORS.GREEN]: style.getPropertyValue("--gb-green"),
        [COLORS.BLUE]: style.getPropertyValue("--gb-blue"),
        [COLORS.YELLOW]: style.getPropertyValue("--gb-yellow"),
      },
      background: style.getPropertyValue("--theme-main-bg-color"),
    };

    this.onThemeChange.next(this.gameboardTheme);
  }

  // write/change functions

  /**
   * changes the value of the css variable "transitionTime"
   * to activate and later deactivate the fade effect for the
   * theme transition
   */
  private triggerThemeTransition() {
    const transitionTime: number = 0.5;

    // start theme transition
    document.body.style.setProperty(
      "--theme-transition-time",
      transitionTime.toString() + "s"
    );

    // end theme transition
    setTimeout(() => {
      document.body.style.removeProperty("--theme-transition-time");
    }, transitionTime * 1000);
  }

  /**
   * changes and saves the new settings and apllies them to the editor
   * @param fontSize editor font size
   * @param tabWidth number of spaces for indentation in the editor
   */
  saveEditorSettings(settings: { fontSize?: number; tabWidth?: number }) {
    if (settings.fontSize) {
      this.settings.globalSettings.font_size = settings.fontSize;
    }
    if (settings.tabWidth) {
      this.settings.globalSettings.tab_width = settings.tabWidth;
      this.onEditorSettingsChange.next({
        tab_width: settings.tabWidth,
      });
    }
    this.saveSettings();
  }

  setSetting(key: string, value: any) {
    this.settings.globalSettings[key] = value;
    this.saveSettings();
    this.applyUISettings();
  }

  /**
   * changes the value in the settings object and saves the new state to the localStorage
   * @param speed the new value for the execution speed
   */
  public setSpeed(speed: number) {
    if (this.settings.globalSettings.executionSpeed != speed) {
      this.settings.globalSettings.executionSpeed = speed;
      this.saveSettings();
    }
  }

  /**
   * changes, applies and saves the new UI settings
   * @param theme the new UI theme
   * @param language the new UI language
   * @param touchUIActive whether or not the touch UI should be active
   */
  changeUISettings(
    theme: THEMES,
    language: LANGUAGES,
    touchUIActive: TOUCH_UI,
    newFlags: boolean
  ) {
    if (theme != this.settings.globalSettings.theme) {
      this.settings.globalSettings.theme = theme;
      this.triggerThemeTransition();
      this.applyTheme();
    }
    if (language != this.settings.globalSettings.language) {
      this.settings.globalSettings.language = language;
      this.applyLanguage();
    }
    if (touchUIActive != this.settings.globalSettings.touch_ui) {
      this.settings.globalSettings.touch_ui = touchUIActive;
      this.applyTouchUI();
    }
    this.settings.globalSettings.legacy_flags = newFlags !== false;
    this.saveSettings();
  }
}
