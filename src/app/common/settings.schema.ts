import { Schema } from 'jsonschema';

export class Settings {
  inventoryActive: boolean;
  maxSlabs: number;
  startSlabs: number;
  resetOnStart: boolean;
  fontSize: number;
  tabWidth: number;
  executionSpeed: number;

  constructor(settings: Partial<Settings>) {
    if (settings == null) settings = {};
    this.inventoryActive = settings.inventoryActive == true || false;
    this.maxSlabs = settings.maxSlabs || 20;
    this.startSlabs = settings.startSlabs || 20;
    this.resetOnStart = settings.resetOnStart || true;
    this.fontSize = settings.fontSize || 16;
    this.tabWidth = settings.tabWidth || 4;
    this.executionSpeed = settings.executionSpeed || 3;
  }
}

export const SettingsSchema: Schema = {
  $id: 'https://robotcoral.de/settings',
  title: 'Settings',
  description: 'Serialised settings for robot coral',
  type: 'object',
  properties: {
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
    fontSite: {
      type: 'number',
    },
    tabWidth: {
      type: 'number',
    },
    executionSpeed: {
      type: 'number',
    },
  },
};
