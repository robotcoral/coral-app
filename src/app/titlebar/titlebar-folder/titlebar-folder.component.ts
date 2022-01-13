import { Component, EventEmitter, Input, Output } from "@angular/core";

type titlebarFolder = {
  key: string;
  value: { [key: string]: Function };
};

@Component({
  selector: "app-titlebar-folder",
  templateUrl: "./titlebar-folder.component.html",
})
export class TitlebarFolderComponent {
  @Input()
  folder: titlebarFolder;
  @Input()
  expanded: boolean;
  @Output()
  clicked = new EventEmitter();
  @Input()
  openFolder: string;
  @Output()
  mouseEnter = new EventEmitter<string>();

  open: boolean;

  elementClick(callback: Function) {
    callback();
    this.clicked.emit(false);
  }

  originalOrder = () => 0;
}
