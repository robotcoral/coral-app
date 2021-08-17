import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  MODES,
  PlaceEvent,
} from './gameboard-controls/gameboard-controls.component';
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

  place(event: PlaceEvent) {
    try {
      const coo = this.gameboardView.getMoveCoordinates();
      if (event.mode == MODES.SLAB)
        this.gameboardView.world.placeSlab(coo, event.color);
      else if (event.mode == MODES.CUBE)
        this.gameboardView.world.placeBlock(coo);
      else this.gameboardView.world.placeSlab(coo, event.color);
    } catch (error) {
      this.toastr.error(error);
    }
  }

  pickUp(mode: MODES) {
    try {
      const coo = this.gameboardView.getMoveCoordinates();
      if (mode == MODES.SLAB) this.gameboardView.world.pickUpSlab(coo);
      else if (mode == MODES.CUBE) this.gameboardView.world.pickUpBlock(coo);
      else this.gameboardView.world.pickUpSlab(coo);
    } catch (error) {
      this.toastr.error(error);
    }
  }

  isWall() {
    return this.gameboardView.world.outOfBounds(
      this.gameboardView.getMoveCoordinates()
    );
  }

  isSlab(amount = 1) {
    return this.gameboardView.world.isStackMinHeight(
      this.gameboardView.getMoveCoordinates(),
      amount
    );
  }

  isSlabColor(color: string) {
    return this.gameboardView.world.isColor(
      this.gameboardView.getMoveCoordinates(),
      color
    );
  }

  isCardinal(cardinal: CARDINALS): boolean {
    return this.gameboardView.isCardinal(cardinal);
  }
}
