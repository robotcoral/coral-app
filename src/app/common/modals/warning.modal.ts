import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface WarningModalConfig {
  title: string;
  description: string;
  successButton?: string;
  abortButton?: string;
}

@Component({
  selector: 'warning-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">{{ data.title }}</h4>
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
        {{ data.description }}
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.close('')"
        >
          {{ data.successButton }}
        </button>
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.dismiss('Close click')"
        >
          {{ data.abortButton }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./modal.styles.scss'],
})
export class WarningModal {
  data: WarningModalConfig;
  constructor(public activeModal: NgbActiveModal) {}

  init(config: WarningModalConfig) {
    this.data = {
      title: config.title,
      description: config.description,
      successButton: config.successButton || 'Ok',
      abortButton: config.abortButton || 'Cancel',
    };
  }
}
