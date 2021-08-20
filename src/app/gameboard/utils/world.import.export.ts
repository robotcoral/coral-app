import { validate } from 'jsonschema';
import { Block, Robot, Slab, World } from '.';
import { WorldSchema } from './schemas/world.schema';

export interface WorldFile {
  length: number;
  width: number;
  height: number;
  objects: ((string | number)[] | boolean)[][];
  flags: (string | number)[][];
  robot: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    direction: number;
  };
}

export class WorldExport {
  static export(world: World, robot: Robot) {
    const worldFile: WorldFile = {
      length: world.sizeX,
      width: world.sizeY,
      height: world.sizeZ,
      objects: [],
      flags: [],
      robot: {
        position: {
          x: robot.position.x,
          y: robot.position.z,
          z: robot.position.y * 2,
        },
        direction: robot.getCardinal(),
      },
    };
    for (let x = 0; x < world.sizeX; x++) {
      worldFile.objects.push([]);
      worldFile.flags.push([]);
      for (let y = 0; y < world.sizeY; y++) {
        worldFile.flags[x].push(
          world.flags[x][y] ? world.flags[x][y].color : undefined
        );
        let entry: boolean | string[] = false;
        if (world.objects[x][y] != undefined) {
          if (world.objects[x][y] instanceof Block) entry = true;
          else {
            entry = [];
            (world.objects[x][y] as Slab[]).forEach((slab: Slab) => {
              (entry as string[]).push(slab.color);
            });
          }
        }
        worldFile.objects[x].push(entry);
      }
    }

    return JSON.stringify(worldFile);
  }
}

export class WorldImport {
  static import(worldString: string, world: World, robot: Robot) {
    const json = JSON.parse(worldString) as WorldFile;
    this.validateIntegrity(json);
    this.validateLogic(json);
    world.resize({ x: json.length, y: json.width, z: json.height });
    robot
      .setPosition({
        x: json.robot.position.x,
        y: json.robot.position.y,
        z: json.robot.position.z,
      })
      .setDirection(json.robot.direction);
    for (let x = 0; x < world.sizeX; x++) {
      for (let y = 0; y < world.sizeY; y++) {
        if (json.flags[x][y])
          world.placeFlag({ x, y }, json.flags[x][y] as string);
        if (!json.objects[x][y]) continue;
        if (typeof json.objects[x][y] == 'boolean') world.placeBlock({ x, y });
        else
          (json.objects[x][y] as string[]).forEach((color) => {
            world.placeSlab({ x, y }, color);
          });
      }
    }
  }

  private static validateIntegrity(world: WorldFile) {
    const errors = validate(world, WorldSchema).errors;
    if (errors.length > 0) {
      console.log(errors);
      throw new Error(
        'Could not read world file.\nCheck console for additional details'
      );
    }
    if (world.objects.length != world.width)
      throw new Error(
        `World.objects is size ${world.objects.length}, but should be ${world.width}`
      );
    if (world.flags.length != world.width)
      throw new Error(
        `World.flags is size ${world.objects.length}, but should be ${world.width}`
      );
    for (let x = 0; x < world.width; x++) {
      if (world.objects[x].length != world.length)
        throw new Error(
          `World.objects[${x}] is size ${world.objects[x].length}, but should be ${world.length}`
        );
      if (world.flags[x].length != world.length)
        throw new Error(
          `World.flags[${x}] is size ${world.objects[x].length}, but should be ${world.length}`
        );
      for (let y = 0; y < world.length; y++) {
        if (
          typeof world.objects[x][y] != 'boolean' &&
          (world.objects[x][y] as string[]).length > world.height
        )
          throw new Error(
            `World.objects[${x}][${y}] is size ${
              (world.objects[x][y] as string[]).length
            }, but should be smaller then ${world.height}`
          );
      }
    }
  }

  private static validateLogic(world: WorldFile) {
    if (
      world.robot.position.x >= world.length ||
      world.robot.position.y >= world.width ||
      world.robot.position.z >= world.height
    )
      throw new Error(`Robot position out of bounds`);
    const worldPosition =
      world.objects[world.robot.position.x][world.robot.position.y];
    if (!worldPosition) return;
    if (typeof worldPosition == 'boolean')
      throw new Error('Robot is standing on blocked field');
    if ((worldPosition as string[]).length != world.robot.position.z)
      throw new Error('Robot is stuck in slab or flying');
  }
}
