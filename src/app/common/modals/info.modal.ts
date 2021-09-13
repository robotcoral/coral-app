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
        {{ 'MODALS.INFO.LICENSE' | translate }}
        <a href="https://www.gnu.org/licenses/gpl-3.0" target="_blank">GPLv3</a>
        {{ 'MODALS.INFO.LICENSE2' | translate }}
        <br />
        {{ 'MODALS.INFO.ROBOT_CREDIT' | translate }}
        <a href="https://maxparata.itch.io/" target="_blank">Max Parata</a>
      </div>
    </div>
  `,
  styleUrls: ['./modal.styles.scss'],
})
export class InfoModal {
  constructor(public activeModal: NgbActiveModal) {}
}
