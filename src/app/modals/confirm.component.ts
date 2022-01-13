import { Component } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: "confirm",
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{ title | translate }}</h4>
      </div>
      <div class="modal-body">
        <p>{{ message | translate }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" (click)="close()">
          {{ "COMMON.CANCEL" | translate }}
        </button>
        <button type="button" class="btn btn-primary" (click)="confirm()">
          {{ "COMMON.OK" | translate }}
        </button>
      </div>
    </div>
  `,
})
export class ConfirmComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel
{
  title: string;
  message: string;
  constructor() {
    super();
  }
  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
  }
}
