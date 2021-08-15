import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(GameboardComponent)
  gameboard: GameboardComponent;
  @ViewChild('splitBorder', { static: true })
  resizerRef: ElementRef;
  resizer: HTMLElement;
  leftSide: HTMLElement;
  rightSide: HTMLElement;
  x = 0;
  y = 0;
  leftWidth = 0;

  ngAfterViewInit(): void {
    this.resizer = this.resizerRef.nativeElement;
    this.leftSide = this.resizer.previousElementSibling as HTMLElement;
    this.rightSide = this.resizer.nextElementSibling as HTMLElement;

    this.resizer.addEventListener('mousedown', this.mouseDownHandler);
  }

  // Handle the mousedown event
  // that's triggered when user drags the resizer
  mouseDownHandler = (event: MouseEvent) => {
    // Get the current mouse position
    this.x = event.clientX;
    this.y = event.clientY;
    this.leftWidth = this.leftSide.getBoundingClientRect().width;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  };

  mouseMoveHandler = (event: MouseEvent) => {
    // How far the mouse has been moved
    const dx = event.clientX - this.x;

    const newLeftWidth =
      ((this.leftWidth + dx) * 100) /
      this.resizer.parentElement.getBoundingClientRect().width;
    this.leftSide.style.width = `${newLeftWidth}%`;

    this.resizer.style.cursor = 'col-resize';
    document.body.style.cursor = 'col-resize';

    this.leftSide.style.userSelect = 'none';
    this.leftSide.style.pointerEvents = 'none';

    this.rightSide.style.userSelect = 'none';
    this.rightSide.style.pointerEvents = 'none';

    // resize canvas
    this.gameboard.canvas.style.width =
      this.gameboard.gameboard.clientWidth + 'px';
  };

  mouseUpHandler = () => {
    this.resizer.style.removeProperty('cursor');
    document.body.style.removeProperty('cursor');

    this.leftSide.style.removeProperty('user-select');
    this.leftSide.style.removeProperty('pointer-events');

    this.rightSide.style.removeProperty('user-select');
    this.rightSide.style.removeProperty('pointer-events');

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  };
}
