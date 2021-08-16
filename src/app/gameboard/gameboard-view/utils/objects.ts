import {
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
} from 'three';

export class Slab extends Mesh {
  color: string;

  constructor(scale: number, color: string) {
    const geometry = new BoxGeometry(scale, scale / 2, scale);
    const material = new MeshBasicMaterial({ color });
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
