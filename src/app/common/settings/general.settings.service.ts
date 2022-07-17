import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { validate } from "jsonschema";
import { Subject } from "rxjs";
import { COLORS, MaterialColors } from "../../gameboard/utils";
import { SettingsService } from "./settings";
import {
  GeneralSettings,
  GeneralSettingsSchema,
  LANGUAGES,
  LANGUAGE_CODES,
  THEMES,
} from "./settings.schema";

/**
 * localStorage key for the global settings object
 */
const GENERAL_SETTINGS_KEY = "Settings";

export interface GameboardTheme {
  background: string;
  colors: MaterialColors;
}

@Injectable({
  providedIn: "root",
})
export class GeneralSettingsService
  extends SettingsService<GeneralSettings>
  implements OnInit
{
  settings: GeneralSettings;
  onThemeChange: Subject<GameboardTheme> = new Subject();
  gameboardTheme: GameboardTheme;
  onSettingsChange: Subject<GeneralSettings> = new Subject();

  constructor(
    private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private translationService: TranslateService
  ) {
    super();
    this.loadSettings();
    this.repairInvalidSettings();
    this.saveSettings();

    this.window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => this.triggerCanvasThemeChange());
  }

  ngOnInit(): void {
    this.applySettings();
    this.triggerCanvasThemeChange();
  }

  // load function

  /**
   * loads the settings defined in the localStorage into the settings object.
   * If any errors were found, the settings object is created with the default values
   * @returns undefined
   */
  loadSettings() {
    const generalSettingsString =
      window.localStorage.getItem(GENERAL_SETTINGS_KEY);

    if (generalSettingsString == null) {
      this.settings = new GeneralSettings({});
      return;
    }

    const generalSettingsObject = JSON.parse(
      generalSettingsString
    ) as GeneralSettings;
    const errors = validate(
      generalSettingsObject,
      GeneralSettingsSchema
    ).errors;
    if (errors.length) {
      console.error(errors);
      this.settings = new GeneralSettings({});
      return;
    }

    this.settings = new GeneralSettings(generalSettingsObject);
  }

  /**
   * fixes possible errors in the settings object,
   * e.g. "fr" is a valid string for the language, but because it
   * hasn't been implemented yet, it is considered an error
   */
  repairInvalidSettings() {
    if (!Object.values(THEMES).includes(this.settings.theme)) {
      this.settings.theme = THEMES.Auto;
    }

    if (!LANGUAGE_CODES[this.settings.language]) {
      if (LANGUAGE_CODES[navigator.language]) {
        this.settings.language = LANGUAGES[LANGUAGE_CODES[navigator.language]];
      } else {
        this.settings.language = LANGUAGES.English;
      }
    }
  }

  /**
   * calls saveGlobalSettings() and saveFileSettings() which save the settings to the localStorage/sessionStorage
   */
  protected saveSettings() {
    this.window.localStorage.setItem(
      GENERAL_SETTINGS_KEY,
      JSON.stringify(this.settings)
    );
    this.applySettings();
  }

  // apply functions

  /**
   * applies the state defined in settings to the UI
   */
  private applySettings() {
    this.applyTheme();
    this.applyLanguage();
    this.applyTouchUI();
    this.onSettingsChange.next(this.settings);
  }

  /**
   * applies the theme defined in settings.theme to the UI
   */
  private applyTheme() {
    if (this.settings.theme != "auto") {
      this.document.documentElement.setAttribute(
        "light-theme",
        this.settings.theme
      );
      this.document.documentElement.setAttribute(
        "dark-theme",
        this.settings.theme
      );
    } else {
      this.document.documentElement.setAttribute("light-theme", "light");
      this.document.documentElement.setAttribute("dark-theme", "dark");
    }
    this.triggerCanvasThemeChange();
  }

  /**
   * activates/deactivates the touchUI depending on the setting in settings.touchUIActive
   */
  private applyTouchUI() {
    if (this.settings.touch_ui) {
      this.document.documentElement.setAttribute("touch-ui", "true");
    } else {
      this.document.documentElement.setAttribute("touch-ui", "false");
    }
  }

  /**
   * applies the language defined in settings.language to the UI
   */
  private applyLanguage() {
    let realLang: LANGUAGES;
    if (this.settings.language == LANGUAGES.Auto) {
      if (LANGUAGE_CODES[navigator.language]) {
        realLang = LANGUAGES[LANGUAGE_CODES[navigator.language]];
      } else {
        realLang = LANGUAGES.English;
      }
    } else {
      realLang = this.settings.language;
    }
    this.document.documentElement.lang = realLang;
    this.translationService.use(realLang);
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

  setSetting(key: keyof GeneralSettings, value: any) {
    //@ts-expect-error
    this.settings[key] = value;
    this.saveSettings();
  }
}
