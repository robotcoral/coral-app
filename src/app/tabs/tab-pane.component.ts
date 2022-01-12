import { Component, Input } from "@angular/core";

@Component({
  selector: "tab-pane",
  template: `<ng-container *ngIf="active" class="tab-pane">
    <ng-content></ng-content
  ></ng-container>`,
})
export class TabPaneComponent {
  @Input() title!: string;
  @Input() active = false;
  @Input() icon!: string;
}
