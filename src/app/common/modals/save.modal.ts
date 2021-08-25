import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'save-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">Save world as default</h4>
        <button
          type="button"
          class="close"
          aria-label="Close"
          (click)="activeModal.dismiss('Cross click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Do you want to save this world as default? Resetting will return the
        world to this state.
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.close('')"
        >
          Ok
        </button>
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.dismiss('Close click')"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./modal.styles.scss'],
})
export class SaveModal {
  constructor(public activeModal: NgbActiveModal) {}
}
