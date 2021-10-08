import { Schema } from 'jsonschema';

/**
 * all available UI themes
 */
export enum THEMES {
  Light = 'light',
  Dark = 'dark',
  Midnight = 'midnight',
}

/**
 * all available UI languages
 */
export enum LANGUAGES {
  English = 'en',
  German = 'de',
}

/**
 * inversion of LANGUAGES
 */
export enum LANGUAGE_CODES {
  'en' = 'English',
  'de' = 'German',
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
  theme: THEMES | 'auto';
  language: LANGUAGES;
  touchUIActive: boolean;
  newFlags: boolean;
  // editor settings
  fontSize: number;
  tabWidth: number;
  // execution settings
  executionSpeed: number;

  /**
   *
   * @param settings object containing the persistent, global settings
   */
  constructor(settings: Partial<GlobalSettings>) {
    // UI settings
    this.theme = settings.theme || 'auto';
    this.language = settings.language || undefined;
    this.touchUIActive =
      settings.touchUIActive || window.navigator.maxTouchPoints > 0;
    // editor settings
    this.fontSize = settings.fontSize || 16;
    this.tabWidth = settings.tabWidth || 4;
    // execution settings
    this.executionSpeed = settings.executionSpeed || 3;
    this.newFlags = settings.newFlags!==false;
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
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://cdn.robotcoral.de/schemes/settings.json',
  title: 'Settings',
  description: 'Serialised global settings for Robot Coral',
  type: 'object',
  properties: {
    ui: {
      type: 'object',
      description: 'UI settings',
      properties: {
        theme: {
          type: 'string',
        },
        language: {
          type: 'string',
        },
        touchUIActive: {
          type: 'string',
        },
        legacyFlags: {
          type: 'boolean',
        },
      },
    },
    editor: {
      type: 'object',
      description: 'Editor settings',
      properties: {
        fontSite: {
          type: 'number',
        },
        tabWidth: {
          type: 'number',
        },
      },
    },
    execution: {
      type: 'object',
      description: 'Execution settings',
      properties: {
        executionSpeed: {
          type: 'number',
        },
      },
    },
  },
};

/* do not delete: schema for sessionStorage;
currently not needed.
If we decide, that session settings should survive reloading the window,
this code will be needed. It is also a good reference for the FileSettings class
sessionStorage:
    inventoryActive: {
      type: 'boolean',
    },
    maxSlabs: {
      type: 'number',
    },
    startSlabs: {
      type: 'number',
    },
        resetOnStart: {
      type: 'boolean',
    },
*/
