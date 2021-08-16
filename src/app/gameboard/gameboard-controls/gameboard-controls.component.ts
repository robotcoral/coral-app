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
  colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
  };
  color = 'red';
  colorExpanded = false;
  style = '';

  onMove() {
    this.move.emit(null);
  }

  onRotate(dir = 1) {
    this.rotate.emit(dir);
  }

  onColorMenu() {
    this.style = this.colorExpanded
      ? ''
      : 'position:absolute; margin-top:-6.75rem; background-color: white; box-shadow: 0 0 2px 2px lightgray';
    this.colorExpanded = !this.colorExpanded;
  }

  onColorSelect(color: string) {
    this.color = color;
    this.onColorMenu();
  }
}
