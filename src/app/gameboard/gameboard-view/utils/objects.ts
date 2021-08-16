import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export class Slab extends Mesh {
  constructor(scale: number, color: string) {
    const geometry = new BoxGeometry(scale, scale / 2, scale);
    const material = new MeshBasicMaterial({ color });
    super(geometry, material);
  }
}

export class Block extends Mesh {
  constructor(scale: number) {
    const geometry = new BoxGeometry(scale);
    const material = new MeshBasicMaterial({ color: 0xf0f0f0 });
    super(geometry, material);
  }
}
