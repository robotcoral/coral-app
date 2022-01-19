import { Component, Input } from "@angular/core";

@Component({
  selector: "tab-pane",
  templateUrl: "./tab-pane.component.html",
})
export class TabPaneComponent {
  @Input() title!: string;
  @Input() active = false;
  @Input() icon!: string;
  @Input() closable: boolean = false;
}
