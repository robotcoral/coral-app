import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  place(color: string) {
    try {
      const coo = this.gameboardView.robot.getMoveCoordinates();
      if (color) this.gameboardView.world.placeSlab(coo, color);
      else this.gameboardView.world.placeBlock(coo);
    } catch (error) {
      this.toastr.error(error);
    }
  }

  pickUp(block: boolean) {
    try {
      const coo = this.gameboardView.robot.getMoveCoordinates();
      if (block) this.gameboardView.world.pickUpBlock(coo);
      else this.gameboardView.world.pickUpSlab(coo);
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
