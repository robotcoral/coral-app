import { Group, Vector3 } from 'three';
import { Coordinates2, Coordinates3 } from './coordinates';
import { COLORS } from './gameboard.controller';
import { Grid } from './grid';
import { Block, Flag, MaterialColors, ObjectFactory, Slab } from './objects';
import { WorldImport } from './world.import.export';
import { WorldData } from './world.schema';

export interface WorldOptions {
  dimensions?: Coordinates3;
  scale?: number;
  gridColor?: number;
}

export class World extends Group {
  meshGroup: Group = new Group();
  objects: (Slab[] | Block)[][];
  flags: Flag[][];
  dimensions: Coordinates3;
  gridScale: number;
  offsetVector: Vector3;
  grid: Grid;
  defaultWorld: WorldData;
  factory: ObjectFactory;

  constructor(options: WorldOptions = {}) {
    super();
    this.dimensions = options?.dimensions || { x: 10, y: 10, z: 6 };
    this.gridScale = options.scale || 50;
    this.calcOffset();
    this.createGrid(options.gridColor);
    this.add(this.meshGroup);
    this.defaultWorld = { dimensions: this.dimensions };
    this.reset();
    this.initFactory();
  }

  private initFactory() {
    this.factory = ObjectFactory.getInstance();
    this.factory.scale = this.gridScale;
  }

  reset() {
    WorldImport.loadWorld(this, this.defaultWorld);
  }

  hardReset() {
    this.objects = [];
    this.flags = [];
    for (var i = 0; i < this.dimensions.x; i++) {
      this.objects.push(new Array(this.dimensions.y));
      this.flags.push(new Array(this.dimensions.y));
    }
    this.meshGroup.children = [];
  }

  private calcOffset() {
    this.offsetVector = new Vector3(
      (this.dimensions.x / 2 - 0.5) * -this.gridScale,
      0,
      (this.dimensions.y / 2 - 0.5) * -this.gridScale
    );
  }

  resize(coo: Coordinates3) {
    [this.dimensions.x, this.dimensions.y, this.dimensions.z] = [
      coo.x,
      coo.y,
      coo.z,
    ];
    this.hardReset();
    this.calcOffset();
    this.remove(this.grid);
    this.createGrid();
  }

  private createGrid(color = 0x444444) {
    this.grid = new Grid({
      height: this.dimensions.x,
      width: this.dimensions.y,
      cellHeight: this.gridScale,
      cellWidth: this.gridScale,
      color,
      zOffset: -this.gridScale / 2,
    });
    this.add(this.grid);
  }

  placeSlab(coo: Coordinates2, color = COLORS.RED) {
    if (this.outOfBounds(coo)) throw new Error('ERRORS.SLAB_OUTSIDE_WORLD');
    if (this.isBlock(coo)) throw new Error('ERRORS.BLOCK_IN_WAY');
    if (this.isFullStack(coo)) throw new Error('ERRORS.MAX_HEIGHT');

    if (!this.objects[coo.x][coo.y]) this.objects[coo.x][coo.y] = [];
    const height = (this.objects[coo.x][coo.y] as Slab[]).push(
      this.factory.slab(color)
    );
    const vector = new Vector3(coo.x, -0.75 + 0.5 * height, coo.y);
    (this.objects[coo.x][coo.y][height - 1] as Slab).position
      .add(this.offsetVector)
      .addScaledVector(vector, this.gridScale);
    this.meshGroup.add(this.objects[coo.x][coo.y][height - 1]);

    if(this.isFlag(coo))this.raiseFlag(coo);
  }

  private raiseFlag(coo: Coordinates2) {
    this.flags[coo.x][coo.y].position.add(new Vector3(0,this.gridScale/2,0))
  }

  private lowerFlag(coo: Coordinates2) {
    this.flags[coo.x][coo.y].position.add(new Vector3(0,-this.gridScale/2,0))
  }

  placeBlock(coo: Coordinates2) {
    if (this.outOfBounds(coo)) throw new Error('ERRORS.BLOCK_OUTSIDE_WORLD');
    if (this.isBlock(coo)) throw new Error('ERRORS.BLOCK_IN_WAY');
    if (this.isStackMinHeight(coo, 1))
      throw new Error('ERRORS.CANT_PLACE_BLOCK_HERE');

    this.objects[coo.x][coo.y] = this.factory.block();

    (this.objects[coo.x][coo.y] as Block).position
      .add(this.offsetVector)
      .addScaledVector(new Vector3(coo.x, 0, coo.y), this.gridScale);
    this.meshGroup.add(this.objects[coo.x][coo.y] as Block);
  }

  placeFlag(coo: Coordinates2, color = COLORS.RED) {
    if (this.flags[coo.x][coo.y] != undefined)
      throw new Error('ERRORS.ALREADY_FLAG');
    this.flags[coo.x][coo.y] = this.factory.flag(color);
    this.flags[coo.x][coo.y].position
      .add(this.offsetVector)
      .addScaledVector(new Vector3(coo.x, -0.5, coo.y), this.gridScale);
      if(this.isStackMinHeight(coo,1)) this.flags[coo.x][coo.y].position.addScaledVector(new Vector3(0,(this.objects[coo.x][coo.y] as []).length/2,0),this.gridScale)
    this.meshGroup.add(this.flags[coo.x][coo.y]);
  }

  pickUpSlab(coo: Coordinates2) {
    if (this.isBlock(coo)) throw new Error('ERRORS.CANT_PICK_UP');
    if (this.outOfBounds(coo) || !this.isStackMinHeight(coo, 1))
      throw new Error('ERRORS.NOTHING_TO_PICK_UP');
    this.meshGroup.remove((this.objects[coo.x][coo.y] as Slab[]).pop());
    if(this.isFlag(coo)) this.lowerFlag(coo)
  }

  pickUpBlock(coo: Coordinates2) {
    if (this.isStackMinHeight(coo, 1)) throw new Error('ERRORS.CANT_PICK_UP');
    if (this.outOfBounds(coo) || !this.isBlock(coo))
      throw new Error('ERRORS.NOTHING_TO_PICK_UP');
    this.meshGroup.remove(this.objects[coo.x][coo.y] as Block);
    this.objects[coo.x][coo.y] = undefined;
  }

  pickUpFlag(coo: Coordinates2) {
    if (this.flags[coo.x][coo.y] == undefined)
      throw new Error('ERRORS.NOTHING_TO_PICK_UP');
    this.meshGroup.remove(this.flags[coo.x][coo.y]);
    this.flags[coo.x][coo.y] = undefined;
  }

  isFullStack(coo: Coordinates2) {
    return this.isStackHeight(coo, this.dimensions.z);
  }

  isStackHeight(coo: Coordinates2, height: number) {
    return this.height(coo) == height;
  }

  isStackMinHeight(coo: Coordinates2, height: number) {
    return this.height(coo) >= height;
  }

  isStackMaxHeight(coo: Coordinates2, height: number) {
    return this.height(coo) <= height;
  }

  isColor(coo: Coordinates2, color: COLORS) {
    return (
      this.isStackMinHeight(coo, 1) &&
      (this.objects[coo.x][coo.y] as Slab[])[this.height(coo) - 1].color ===
        color
    );
  }

  height(coo: Coordinates2) {
    if (this.objects[coo.x][coo.y] == undefined) return 0;
    return (this.objects[coo.x][coo.y] as Slab[]).length;
  }

  isBlock(coo: Coordinates2) {
    return this.objects[coo.x][coo.y] instanceof Block;
  }

  isFlag(coo: Coordinates2, color?: COLORS) {
    return this.flags[coo.x][coo.y] && (color
      ? this.flags[coo.x][coo.y].color == color
      : true);
  }

  outOfBounds(coo: Coordinates2) {
    return (
      coo.x >= this.dimensions.x ||
      coo.x < 0 ||
      coo.y >= this.dimensions.y ||
      coo.y < 0
    );
  }

  collision(coo: Coordinates3) {
    if (this.outOfBounds(coo)) throw new Error('ERRORS.WALL_IN_WAY');
    if (this.isBlock(coo)) throw new Error('ERRORS.BLOCK_IN_PATH');
    if (!this.isStackMaxHeight(coo, coo.z + 1)) throw new Error('ERRORS.JUMP');
  }

  getWorldSize(): Coordinates3 {
    return { x: this.dimensions.x, y: this.dimensions.y, z: this.dimensions.z };
  }

  setTheme(colorMaterials: MaterialColors) {
    this.factory.colorMaterials = colorMaterials;
  }
}
