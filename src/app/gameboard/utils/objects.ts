import {
  BoxGeometry,
  ColorRepresentation,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial
} from 'three';
import { COLORS } from './gameboard.controller';

export type MaterialColors = { [key in COLORS]: ColorRepresentation };
type ColorMaterials = { [key in COLORS]: MeshBasicMaterial };

export class Slab extends Mesh {
  color: COLORS;

  constructor(scale: number, color: COLORS, material: MeshBasicMaterial) {
    const geometry = new BoxGeometry(scale, scale / 2, scale);
    super(geometry, material);

    this.color = color;

    this.addWireframe(geometry);
  }

  private addWireframe(geometry: BoxGeometry) {
    const edgesGeometry = new EdgesGeometry(geometry);
    const edgesMaterial = new LineBasicMaterial({ color: 0x0, linewidth: 10 });
    const wireframe = new LineSegments(edgesGeometry, edgesMaterial);
    wireframe.renderOrder = 1;
    this.add(wireframe);
  }
}

export class Block extends Mesh {
  constructor(scale: number) {
    const geometry = new BoxGeometry(scale, scale, scale);
    const material = new MeshBasicMaterial({ color: 0x0 });
    super(geometry, material);
  }
}

export class Flag extends Mesh {
  color: COLORS;

  constructor(scale: number, color: COLORS, material: MeshBasicMaterial) {
    const geometry = new BoxGeometry(scale, 0, scale);
    super(geometry, material);
    this.renderOrder = 2;
    this.color = color;
  }
}

export class ObjectFactory {
  private static instance: ObjectFactory;
  private _scale: number;
  private _colorMaterials: ColorMaterials;

  static getInstance() {
    if (!this.instance) this.instance = new ObjectFactory();

    return this.instance;
  }

  private constructor() {
    this._colorMaterials = {} as ColorMaterials;
    Object.values(COLORS).forEach((color) => {
      this._colorMaterials[color] = new MeshBasicMaterial();
    });
  }

  slab(color: COLORS): Slab {
    return new Slab(this._scale, color, this._colorMaterials[color]);
  }

  flag(color: COLORS): Flag {
    return new Flag(this._scale, color, this._colorMaterials[color]);
  }

  block(): Block {
    return new Block(this._scale);
  }

  public set scale(value: number) {
    this._scale = value;
  }

  public set colorMaterials(materialColors: MaterialColors) {
    Object.entries(materialColors).forEach(([key, value]) => {
      this._colorMaterials[key as COLORS].color.set(value);
    });
  }
}
