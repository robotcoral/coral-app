import { Group, Vector3 } from 'three';
import { Coordinates2, Coordinates3 } from './coordinates';
import { Grid } from './grid';
import { Block, Slab } from './objects';

export interface WorldOptions {
  sizeX?: number;
  sizeY?: number;
  sizeZ?: number;
  scale?: number;
  gridColor?: number;
}

export class World extends Group {
  objects: (Slab[] | Block)[][];
  flags;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  gridScale: number;
  offsetVector: Vector3;

  constructor(options: WorldOptions = {}) {
    super();
    this.sizeX = options?.sizeX || 10;
    this.sizeY = options.sizeY || 10;
    this.sizeZ = options.sizeZ || 6;
    this.gridScale = options.scale || 50;
    this.offsetVector = new Vector3(
      (this.sizeX / 2 - 0.5) * -this.gridScale,
      0,
      (this.sizeY / 2 - 0.5) * -this.gridScale
    );
    this.add(this.createGrid(options.gridColor));
    this.init();
  }

  private init() {
    this.objects = [];
    for (var i = 0; i < this.sizeX; i++)
      this.objects.push(new Array(this.sizeY));
  }

  private createGrid(color = 0x444444) {
    return new Grid({
      height: this.sizeX,
      width: this.sizeY,
      cellHeight: this.gridScale,
      cellWidth: this.gridScale,
      color,
      zOffset: -this.gridScale / 2,
    });
  }

  placeSlab(coo: Coordinates2, color = '#ff0000') {
    if (this.outOfBounds(coo))
      throw new Error("You can't place slabs outside the map");
    if (this.isBlock(coo)) throw new Error('There is a block on this field');
    if (this.isFullStack(coo))
      throw new Error("You can't put more blocks on this tile");

    if (!this.objects[coo.x][coo.y]) this.objects[coo.x][coo.y] = [];
    const height = (this.objects[coo.x][coo.y] as Slab[]).push(
      new Slab(this.gridScale, color)
    );
    const vector = new Vector3(coo.x, -0.75 + 0.5 * height, coo.y);
    (this.objects[coo.x][coo.y][height - 1] as Slab).position
      .add(this.offsetVector)
      .addScaledVector(vector, this.gridScale);
    this.add(this.objects[coo.x][coo.y][height - 1]);
  }

  placeBlock(coo: Coordinates2, color = '#ff0000') {
    if (this.outOfBounds(coo))
      throw new Error("You can't place blocks outside the map");
    if (this.isBlock(coo)) throw new Error('There is a block on this field');
    if (this.isStackMinHeight(coo, 1))
      throw new Error("You can't put a blocks on this tile");

    this.objects[coo.x][coo.y] = new Block(this.gridScale);

    (this.objects[coo.x][coo.y] as Block).position
      .add(this.offsetVector)
      .addScaledVector(new Vector3(coo.x, 0, coo.y), this.gridScale);
    this.add(this.objects[coo.x][coo.y] as Block);
  }

  pickUpSlab(coo: Coordinates2) {
    if (this.isBlock(coo)) throw new Error("You can't pick this up");
    if (this.outOfBounds(coo) || !this.isStackMinHeight(coo, 1))
      throw new Error('Nothing to pick up');
    this.remove((this.objects[coo.x][coo.y] as Slab[]).pop());
  }

  pickUpBlock(coo: Coordinates2) {
    if (this.isStackMinHeight(coo, 1))
      throw new Error("You can't pick this up");
    if (this.outOfBounds(coo) || !this.isBlock(coo))
      throw new Error('Nothing to pick up');
    this.remove(this.objects[coo.x][coo.y] as Block);
    this.objects[coo.x][coo.y] = undefined;
  }

  isFullStack(coo: Coordinates2) {
    return this.isStackHeight(coo, this.sizeZ);
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

  isColor(coo: Coordinates2, color: string) {
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

  outOfBounds(coo: Coordinates2) {
    return coo.x >= this.sizeX || coo.x < 0 || coo.y >= this.sizeY || coo.y < 0;
  }

  collision(coo: Coordinates3) {
    if (this.outOfBounds(coo))
      throw new Error('There is a wall in front of you');
    if (this.isBlock(coo)) throw new Error('There is a block in your way');
    if (!this.isStackMaxHeight(coo, coo.z + 1))
      throw new Error("You can't jump this high");
  }
}
