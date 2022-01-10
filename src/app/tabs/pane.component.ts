import { Component, Input } from "@angular/core";

@Component({
  selector: "pane",
  template: `<div [hidden]="!active" class="pane">
    <ng-content></ng-content>
  </div>`,
})
export class PaneComponent {
  @Input() title!: string;
  @Input() active = false;
}
