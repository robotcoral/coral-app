import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'info-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">Info</h4>
        <button
          type="button"
          class="close"
          aria-label="Close"
          (click)="activeModal.dismiss('Cross click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">TODO</div>
    </div>
  `,
  styleUrls: ['./modal.styles.scss'],
})
export class InfoModal {
  constructor(public activeModal: NgbActiveModal) {}
}
