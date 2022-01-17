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
  en = "English",
  de = "German",
  auto = "Auto",
}

export enum SettingsKeys {
  generalSettings = "generalSettings",
  worldSetting = "worldSettings",
}

/**
 * part of class Settings: contains the global settings
 */
export class GeneralSettings {
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
  constructor(settings: Partial<GeneralSettings>) {
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
export class WorldSettings {
  name: string;
  author: string;
  description: string;
  exportCode: boolean;
  inventory_active: boolean;
  max_slabs: number;
  start_slabs: number;
  reset: boolean;
  width: number;
  length: number;
  height: number;

  /**
   *
   * @param settings object containing the volatile settings for the current file
   */
  constructor(settings: Partial<WorldSettings>) {
    this.name = settings.name;
    this.author = settings.author;
    this.description = settings.description;
    this.exportCode = settings.exportCode || false;
    this.inventory_active = settings.inventory_active || false;
    this.max_slabs = settings.max_slabs || 20;
    this.start_slabs = settings.start_slabs || 20;
    this.reset = settings.reset !== false;
    this.width = settings.width || 10;
    this.length = settings.length || 10;
    this.height = settings.height || 6;
  }
}

/**
 * jsonschema for the globalSettings stored in the localStorage
 */
export const GeneralSettingsSchema: Schema = {
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
