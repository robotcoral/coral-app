import { Schema } from 'jsonschema';
import { WORLDOBJECTTYPES } from '../gameboard-controls/gameboard-controls.component';
import { Coordinates2, Coordinates3 } from './coordinates';

export interface WorldObjectData {
  color: string;
}

export interface WorldObject {
  position: Coordinates3 | Coordinates2;
  type: WORLDOBJECTTYPES;
  data?: WorldObjectData;
}

export interface AdditionalWorldData {
  name?: string;
  author?: string;
  description?: string;
}

export interface WorldData extends AdditionalWorldData {
  dimensions: Coordinates3;
  starting_position?: Coordinates3;
  starting_rotation?: number;
  objects?: WorldObject[];
}

export interface WorldFile {
  version: number;
  coral_version?: string;
  world_data: WorldData;
}

export const WorldSchema: Schema = {
  $id: 'https://robotcoral.de/world',
  title: 'World',
  description: 'A robot coral world',
  type: 'object',
  properties: {
    version: { type: 'number' },
    coral_version: {
      type: 'string',
    },
    world_data: {
      type: 'object',
      properties: {
        name: {
          description: 'Name of the world',
          type: 'string',
        },
        author: {
          description: 'Name of the author',
          type: 'string',
        },
        description: {
          type: 'string',
        },
        dimensions: {
          type: 'object',
          description: 'Size of the world',
          properties: {
            x: {
              type: 'integer',
              exclusiveMinimum: 0,
            },
            y: {
              type: 'integer',
              exclusiveMinimum: 0,
            },
            z: {
              type: 'integer',
              minimum: 0,
            },
          },
          required: ['x', 'y', 'z'],
        },
        starting_position: {
          type: 'object',
          description: 'Robot starting positon',
          properties: {
            x: {
              type: 'integer',
              minimum: 0,
            },
            y: {
              type: 'integer',
              minimum: 0,
            },
            z: {
              type: 'integer',
              minimum: 0,
            },
          },
          required: ['x', 'y', 'z'],
        },
        starting_rotation: {
          type: 'integer',
          minimum: 0,
          maximum: 3,
        },
        objects: {
          description: 'Objects in the world',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              position: {
                type: 'object',
                properties: {
                  x: {
                    type: 'integer',
                    minimum: 0,
                  },
                  y: {
                    type: 'integer',
                    minimum: 0,
                  },
                  z: {
                    type: 'integer',
                    minimum: 0,
                  },
                },
                required: ['x', 'y'],
              },
              type: {
                type: 'string',
              },
              data: {
                type: 'object',
                properties: {
                  color: {
                    type: 'string',
                  },
                },
              },
            },
          },
          required: ['type', 'position'],
        },
      },
      required: ['dimensions'],
    },
  },
  required: ['version', 'world_data'],
};
