import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'info-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">{{ 'MODALS.INFO.TITLE' | translate }}</h4>
        <button
          type="button"
          class="close"
          (click)="activeModal.dismiss('Cross click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Robot model by <a href="https://maxparata.itch.io/">Max Parata</a>
      </div>
    </div>
  `,
  styleUrls: ['./modal.styles.scss'],
})
export class InfoModal {
  constructor(public activeModal: NgbActiveModal) {}
}
