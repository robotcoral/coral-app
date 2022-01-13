import { Schema } from "jsonschema";

/**
 * all available UI themes
 */
export enum THEMES {
  Light = "light",
  Dark = "dark",
  Midnight = "midnight",
  Nord = "nord",
  Auto = "auto",
}

/**
 * all available UI languages
 */
export enum LANGUAGES {
  English = "en",
  German = "de",
  Auto = "auto",
}

/**
 * inversion of LANGUAGES
 */
export enum LANGUAGE_CODES {
  "en" = "English",
  "de" = "German",
  "auto" = "Auto",
}

/**
 * class which contains all settings divided in two categories:
 * persistent globalSettings and volatile fileSettings
 */
export class Settings {
  globalSettings: GlobalSettings;
  fileSettings: FileSettings;

  /**
   *
   * @param parameterGlobalSettings object containing the persistent, global settings
   * @param parameterFileSettings object containing the volatile settings for the current file
   */
  constructor(
    parameterGlobalSettings: Partial<GlobalSettings>,
    parameterFileSettings: Partial<FileSettings>
  ) {
    // fallback to default values
    if (parameterGlobalSettings == null) parameterGlobalSettings = {};
    if (parameterFileSettings == null) parameterFileSettings = {};

    this.globalSettings = new GlobalSettings(parameterGlobalSettings);
    this.fileSettings = new FileSettings(parameterFileSettings);
  }
}

/**
 * part of class Settings: contains the global settings
 */
export class GlobalSettings {
  // UI settings
  theme: THEMES;
  language: LANGUAGES;
  touch_ui: boolean;
  legacy_flags: boolean | string;
  // editor settings
  font_size: number;
  tab_width: number;
  // execution settings
  executionSpeed: number;

  /**
   *
   * @param settings object containing the persistent, global settings
   */
  constructor(settings: Partial<GlobalSettings>) {
    // UI settings
    this.theme = settings.theme || THEMES.Auto;
    this.language = settings.language || LANGUAGES.Auto;
    this.touch_ui =
      typeof settings.touch_ui === "boolean"
        ? settings.touch_ui
        : window.navigator.maxTouchPoints > 0;
    // editor settings
    this.font_size = settings.font_size || 16;
    this.tab_width = settings.tab_width || 4;
    // execution settings
    this.executionSpeed = settings.executionSpeed || 3;
    this.legacy_flags = settings.legacy_flags;
  }
}

/**
 * part of class Settings: contains the file specific settings
 */
export class FileSettings {
  // TODO
  inventoryActive: boolean;
  maxSlabs: number;
  startSlabs: number;
  resetOnStart: boolean;

  /**
   *
   * @param settings object containing the volatile settings for the current file
   */
  constructor(settings: Partial<FileSettings>) {
    this.inventoryActive = settings.inventoryActive == true || false;
    this.maxSlabs = settings.maxSlabs || 20;
    this.startSlabs = settings.startSlabs || 20;
    this.resetOnStart = settings.resetOnStart || true;
  }
}

/**
 * jsonschema for the globalSettings stored in the localStorage
 */
export const GlobalSettingsSchema: Schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://cdn.robotcoral.de/schemes/settings.json",
  title: "Settings",
  description: "Serialised global settings for Robot Coral",
  type: "object",
  properties: {
    ui: {
      type: "object",
      description: "UI settings",
      properties: {
        theme: {
          type: "string",
        },
        language: {
          type: "string",
        },
        touchUIActive: {
          type: "string",
        },
        newFlags: {
          type: "boolean",
        },
      },
    },
    editor: {
      type: "object",
      description: "Editor settings",
      properties: {
        fontSite: {
          type: "number",
        },
        tabWidth: {
          type: "number",
        },
      },
    },
    execution: {
      type: "object",
      description: "Execution settings",
      properties: {
        executionSpeed: {
          type: "number",
        },
      },
    },
  },
};
