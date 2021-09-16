import { validate } from 'jsonschema';
import { commonEnvironment } from 'src/environments/environment.common';
import {
  Block,
  Robot,
  Slab,
  World,
  WorldData,
  WorldFile,
  WorldSchema,
} from '.';
import { WORLDOBJECTTYPES } from '../gameboard-controls/gameboard-controls.component';
import { Coordinates2, Coordinates3 } from './coordinates';
import { AdditionalWorldData, WorldObject } from './world.schema';

export class WorldExport {
  static export(world: World, robot: Robot, data: AdditionalWorldData) {
    const worldData: WorldData = {
      dimensions: world.getWorldSize(),
      starting_position: robot.getCurrentCoordinates(),
      starting_rotation: robot.getCardinal(),
      objects: [],
    };
    worldData.starting_position.z *= 2;
    Object.entries(data).forEach(([key, value]) => {
      worldData[key] = value;
    });
    for (let x = 0; x < world.dimensions.x; x++) {
      for (let y = 0; y < world.dimensions.y; y++) {
        if (world.flags[x][y])
          worldData.objects.push({
            position: { x, y },
            type: WORLDOBJECTTYPES.FLAG,
            data: {
              color: world.flags[x][y].color,
            },
          });
        if (world.objects[x][y] != undefined) {
          if (world.objects[x][y] instanceof Block)
            worldData.objects.push({
              position: { x, y },
              type: WORLDOBJECTTYPES.CUBE,
            });
          else
            for (let z = 0; z < (world.objects[x][y] as Slab[]).length; z++)
              worldData.objects.push({
                position: { x, y, z },
                type: WORLDOBJECTTYPES.SLAB,
                data: {
                  color: (world.objects[x][y] as Slab[])[z].color,
                },
              });
        }
      }
    }

    const worldFile: WorldFile = {
      version: commonEnvironment.worldFileVersion,
      coral_version: commonEnvironment.version,
      world_data: worldData,
    };
    return worldFile;
  }
}

export class WorldImport {
  static import(worldString: string): WorldFile {
    const worldFile = JSON.parse(worldString) as WorldFile;
    this.validateIntegrity(worldFile);

    const worldData = worldFile.world_data;

    const world = new World({});

    world.resize(worldData.dimensions);
    this.loadWorld(world, worldData);
    this.validateRobot(world, worldData);
    return worldFile;
  }

  static loadWorld(world: World, worldData: WorldData) {
    world.resize(worldData.dimensions);
    worldData.objects?.forEach((object: WorldObject, i: number) => {
      if (this.validateOutOfBounds(object.position, worldData.dimensions))
        throw new Error(`Object at index [${i}] is out of bounds`);
      if (object.type == WORLDOBJECTTYPES.CUBE)
        world.placeBlock(object.position);
      else if (object.type == WORLDOBJECTTYPES.SLAB)
        world.placeSlab(object.position, object.data?.color);
      else world.placeFlag(object.position, object.data?.color);
    });
  }

  private static validateIntegrity(world: WorldFile) {
    const errors = validate(world, WorldSchema).errors;
    if (errors.length == 0) return;

    console.error('Encountered errors while parsing world:\n' + errors);
    throw new Error(
      'Could not read world file.\nCheck console for additional details'
    );
  }

  private static validateRobot(world: World, worldData: WorldData) {
    var startingPosition = worldData.starting_position;
    if (
      startingPosition &&
      this.validateOutOfBounds(worldData.starting_position, world.dimensions)
    )
      throw new Error(`Robot position out of bounds`);
    else startingPosition = { x: 0, y: 0, z: 0 };

    if (world.objects[startingPosition.x][startingPosition.y] === undefined)
      return;
    if (world.objects[startingPosition.x][startingPosition.y] instanceof Block)
      throw new Error('Robot starting position is blocked by a block');
    if (
      (world.objects[startingPosition.x][startingPosition.y] as Slab[])
        .length != startingPosition.z
    )
      throw new Error('Robot is stuck in slab or flying');
  }

  private static validateOutOfBounds(
    coo: Coordinates2 | Coordinates3,
    worldSize: Coordinates3
  ) {
    return (
      coo.x >= worldSize.x ||
      coo.y >= worldSize.y ||
      ('z' in coo && coo.z >= worldSize.z)
    );
  }
}
