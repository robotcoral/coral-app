import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  MODES,
  PlaceEvent,
} from './gameboard-controls/gameboard-controls.component';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';
import { CARDINALS } from './gameboard-view/utils/coordinates';

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
      this.gameboardView.robot.move();
    } catch (error) {
      this.toastr.error(error);
    }
  }

  rotate(dir = 1) {
    this.gameboardView.robot.rotate(dir);
  }

  place(event: PlaceEvent) {
    try {
      const coo = this.gameboardView.robot.getMoveCoordinates();
      if (event.mode == MODES.SLAB)
        this.gameboardView.world.placeSlab(coo, event.color);
      else if (event.mode == MODES.CUBE)
        this.gameboardView.world.placeBlock(coo);
      else
        this.gameboardView.world.placeFlag(
          this.gameboardView.robot.getCurrentCoordinates(),
          event.color
        );
    } catch (error) {
      this.toastr.error(error);
    }
  }

  pickUp(mode: MODES) {
    try {
      const coo = this.gameboardView.robot.getMoveCoordinates();
      if (mode == MODES.SLAB) this.gameboardView.world.pickUpSlab(coo);
      else if (mode == MODES.CUBE) this.gameboardView.world.pickUpBlock(coo);
      else
        this.gameboardView.world.pickUpFlag(
          this.gameboardView.robot.getCurrentCoordinates()
        );
    } catch (error) {
      this.toastr.error(error);
    }
  }

  isWall() {
    return this.gameboardView.world.outOfBounds(
      this.gameboardView.robot.getMoveCoordinates()
    );
  }

  isSlab(amount = 1) {
    return this.gameboardView.world.isStackMinHeight(
      this.gameboardView.robot.getMoveCoordinates(),
      amount
    );
  }

  isSlabColor(color: string) {
    return this.gameboardView.world.isColor(
      this.gameboardView.robot.getMoveCoordinates(),
      color
    );
  }

  isCardinal(cardinal: CARDINALS): boolean {
    return this.gameboardView.robot.isCardinal(cardinal);
  }
}
