import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gameboard-controls',
  templateUrl: './gameboard-controls.component.html',
  styleUrls: ['./gameboard-controls.component.scss'],
})
export class GameboardControlsComponent implements OnInit {
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

  ngOnInit(): void {
    window.onclick = function (event) {
      if (!event.target.matches('.colorBtn')) {
        var dropdowns = document.getElementsByClassName(
          'color-dropdown-content'
        );
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };
  }

  onMove() {
    this.move.emit(null);
  }

  onRotate(dir = 1) {
    this.rotate.emit(dir);
  }

  onColorMenu() {
    this.style = this.colorExpanded
      ? ''
      : 'position:absolute; margin-top:-6.75rem; background-color: lightgray;';
    this.colorExpanded = !this.colorExpanded;
  }

  onColorSelect(color: string) {
    this.color = color;
    this.onColorMenu();
  }
}
