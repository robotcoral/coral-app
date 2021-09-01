import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { UtilService } from './common/modal.controller';
import { GameboardComponent } from './gameboard/gameboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(GameboardComponent)
  gameboardView: GameboardComponent;
  @ViewChild('splitBorder', { static: true })
  resizerRef: ElementRef;
  resizer: HTMLElement;
  @ViewChild('innerSplitBorder', { static: true })
  test: ElementRef;
  leftSide: HTMLElement;
  rightSide: HTMLElement;
  x = 0;
  y = 0;
  leftWidth = 0;
  canvasParent: HTMLElement;
  canvas: HTMLCanvasElement;

  constructor(public window: Window, private utilService: UtilService) {}

  ngAfterViewInit(): void {
    this.resizer = this.resizerRef.nativeElement;
    this.leftSide = this.resizer.previousElementSibling as HTMLElement;
    this.rightSide = this.resizer.nextElementSibling as HTMLElement;

    this.canvasParent = document.getElementById('canvas-parent');
    this.canvas = this.canvasParent.getElementsByTagName('canvas')[0];

    this.test.nativeElement.addEventListener(
      'mousedown',
      this.mouseDownHandler
    );
    this.test.nativeElement.addEventListener(
      'touchstart',
      (event: TouchEvent) => {
        event.preventDefault();
        this.mouseDownHandler(event as unknown as MouseEvent);
      }
    );
  }

  // Handle the mousedown event
  // that's triggered when user drags the resizer
  mouseDownHandler = (event: MouseEvent | TouchEvent) => {
    // Get the current mouse position
    this.x =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.y =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    this.leftWidth = this.leftSide.getBoundingClientRect().width;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('touchmove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
    document.addEventListener('touchend', this.mouseUpHandler);
  };

  mouseMoveHandler = (event: TouchEvent | MouseEvent) => {
    // How far the mouse has been moved
    const dx =
      event instanceof MouseEvent
        ? event.clientX - this.x
        : event.touches[0].clientX - this.x;

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

    this.onWindowResize();
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
    document.removeEventListener('touchmove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
    document.removeEventListener('touchend', this.mouseUpHandler);
  };

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => {
    this.canvas.height = this.canvasParent.clientHeight;
    this.canvas.width = this.canvasParent.clientWidth;
    this.gameboardView.onResize();
  };
}
