import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';

export enum CARDINALS {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent {
  @ViewChild(GameboardViewComponent)
  gameboardView: GameboardViewComponent;

  constructor(private toastr: ToastrService) {}

  move() {
    try {
      this.gameboardView.move();
    } catch (error) {
      this.toastr.error(error);
    }
  }

  rotate(dir = 1) {
    this.gameboardView.rotate(dir);
  }

  place(color: string) {
    try {
      if (color) this.gameboardView.placeSlab(color);
      else this.gameboardView.placeBlock();
    } catch (error) {
      this.toastr.error(error);
    }
  }

  pickUp(block: boolean) {
    try {
      if (block) this.gameboardView.pickUpBlock();
      else this.gameboardView.pickUpSlab();
    } catch (error) {
      this.toastr.error(error);
    }
  }

  isWall() {
    return this.gameboardView.outOfBounds();
  }

  isSlab(amount = 1) {
    return this.gameboardView.isSlab(amount);
  }

  isSlabColor(color: string) {
    return this.gameboardView.isSlabColor(color);
  }

  isCardinal(cardinal: CARDINALS): boolean {
    return this.gameboardView.isCardinal(cardinal);
  }
}
