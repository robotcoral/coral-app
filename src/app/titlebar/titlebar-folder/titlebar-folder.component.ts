import { Component, EventEmitter, Input, Output } from "@angular/core";

type titlebarFolder = {
  key: string;
  value: { [key: string]: Function };
};

@Component({
  selector: "app-titlebar-folder",
  templateUrl: "./titlebar-folder.component.html",
  styleUrls: ["../titlebar.component.scss"],
})
export class TitlebarFolderComponent {
  originalOrder = () => 0;

  @Input()
  folder: titlebarFolder;
  @Input()
  expanded: boolean;
  @Output()
  clicked = new EventEmitter();
}
