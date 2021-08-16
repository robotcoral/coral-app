import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';

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

  pickUp() {
    try {
      this.gameboardView.pickUpSlab();
    } catch (error) {}
  }
}
