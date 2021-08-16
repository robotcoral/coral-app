import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gameboard-controls',
  templateUrl: './gameboard-controls.component.html',
  styleUrls: ['./gameboard-controls.component.scss'],
})
export class GameboardControlsComponent {
  @Output() move = new EventEmitter();
  @Output() rotate = new EventEmitter<number>();

  cube = true;

  onMove() {
    this.move.emit(null);
  }

  onRotate(dir = 1) {
    this.rotate.emit(dir);
  }
}
