import {
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
  Object3D,
  Vector3,
} from "three";

export type GridOptions = {
  height: number;
  width: number;
  cellHeight: number;
  cellWidth: number;
  color: number;
  zOffset?: number;
};

export class Grid extends Object3D {
  material: LineBasicMaterial;
  objectHeight: number;
  objectWidth: number;

  constructor(private options: GridOptions) {
    super();
    this.objectHeight = (options.height * options.cellHeight) / 2;
    this.objectWidth = (options.width * options.cellWidth) / 2;
    options.zOffset = options.zOffset || 0;
    this.init();
  }

  init() {
    const points: Vector3[] = [];

    for (
      let i = -this.objectWidth;
      i <= this.objectWidth;
      i += this.options.cellWidth
    ) {
      points.push(new Vector3(-this.objectHeight, this.options.zOffset, i));
      points.push(new Vector3(this.objectHeight, this.options.zOffset, i));
    }

    for (
      let i = -this.objectHeight;
      i <= this.objectHeight;
      i += this.options.cellHeight
    ) {
      points.push(new Vector3(i, this.options.zOffset, -this.objectWidth));
      points.push(new Vector3(i, this.options.zOffset, this.objectWidth));
    }

    const gridGeo = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
      color: this.options.color,
      opacity: 0.2,
    });
    const line = new LineSegments(gridGeo, material);
    this.add(line);
  }
}
