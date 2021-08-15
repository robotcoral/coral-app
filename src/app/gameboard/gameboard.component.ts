import { Component, ViewChild } from '@angular/core';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent {
  @ViewChild(GameboardViewComponent)
  gameboardView: GameboardViewComponent;

  move() {
    this.gameboardView.move();
  }

  rotate(dir = 1) {
    this.gameboardView.rotate(dir);
  }
}
