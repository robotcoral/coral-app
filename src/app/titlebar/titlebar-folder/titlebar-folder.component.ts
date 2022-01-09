import { Component, Input } from "@angular/core";

type titlebarFolder = {
  key: string;
  value: { [key: string]: Function };
};

@Component({
  selector: "app-titlebar-folder",
  templateUrl: "./titlebar-folder.component.html",
  styleUrls: ["./titlebar-folder.component.scss"],
})
export class TitlebarFolderComponent {
  originalOrder = () => 0;

  @Input()
  folder: titlebarFolder;
}
