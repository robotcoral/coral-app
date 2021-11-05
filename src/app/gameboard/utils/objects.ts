import {
  BoxGeometry,
  ColorRepresentation,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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

export class Flag extends Group {
  color: COLORS;

  constructor(color: COLORS, materialColor: ColorRepresentation) {
    super();
    this.color = color;
    this.init(materialColor);
  }

  init(materialColor: ColorRepresentation) {
    const loader = new GLTFLoader();

    const scale = 20;

    loader.load(
      'assets/models/flag.glb',
      (glb) => {
        this.add(glb.scene);
        this.scale.set(scale, scale, scale);

        (
          (this.children[0].children[1] as Mesh)
            .material as MeshStandardMaterial
        ).emissive.set(materialColor);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }
}

export class ObjectFactory {
  private static instance: ObjectFactory;
  private _scale: number;
  private _materials: ColorMaterials;
  private _materialColors: MaterialColors;

  static getInstance() {
    if (!this.instance) this.instance = new ObjectFactory();

    return this.instance;
  }

  private constructor() {
    this._materials = {} as ColorMaterials;
    Object.values(COLORS).forEach((color) => {
      this._materials[color] = new MeshBasicMaterial();
    });
  }

  slab(color: COLORS): Slab {
    return new Slab(this._scale, color, this._materials[color]);
  }

  flag(color: COLORS): Flag {
    return new Flag(color, this._materials[color].color);
  }

  block(): Block {
    return new Block(this._scale);
  }

  public set scale(value: number) {
    this._scale = value;
  }

  public set colorMaterials(materialColors: MaterialColors) {
    this._materialColors = materialColors;
    Object.entries(materialColors).forEach(([key, value]) => {
      this._materials[key as COLORS].color.set(value);
    });
  }
}
