import { Schema } from 'jsonschema';

export const WorldSchema: Schema = {
  $id: 'https://robotcarol.de/world',
  title: 'World',
  description: 'A robot coral world',
  type: 'object',
  properties: {
    length: {
      description: 'The length of the world',
      type: 'integer',
      exclusiveMinimum: 0,
    },
    width: {
      description: 'The width of the world',
      type: 'integer',
      exclusiveMinimum: 0,
    },
    height: {
      description: 'The height of the world',
      type: 'integer',
      exclusiveMinimum: 0,
    },
    objects: {
      description: 'Objects in the world',
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: ['array', 'boolean'],
          items: {
            type: 'integer',
          },
        },
      },
    },
  },
  required: ['width', 'height', 'length'],
};
