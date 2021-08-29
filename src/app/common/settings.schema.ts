import { Schema } from 'jsonschema';

export class Settings {
  inventoryActive: boolean;
  maxSlabs: number;
  startSlabs: number;

  constructor(settings: Partial<Settings>) {
    if (settings == null) settings = {};
    this.inventoryActive = settings.inventoryActive == true || false;
    this.maxSlabs = settings.maxSlabs || 20;
    this.startSlabs = settings.startSlabs || 20;
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
  },
};
