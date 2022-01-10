import { Component, Input } from "@angular/core";

@Component({
  selector: "pane",
  template: `<ng-container *ngIf="active">
    <ng-content></ng-content>
  </ng-container>`,
})
export class PaneComponent extends Component {
  @Input() title!: string;
  @Input() active = false;
}
