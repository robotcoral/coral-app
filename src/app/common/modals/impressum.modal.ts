import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'impressum-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">Impressum</h4>
        <button
          type="button"
          class="close"
          (click)="activeModal.dismiss('Cross click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h4>Angaben gem&auml;&szlig; &sect; 5 TMG</h4>
        <p>
          Samuel H&ouml;ra<br />
          Keilbergweg 4<br />
          83301 Traunreut
        </p>

        <h4>Kontakt</h4>
        <p>E-Mail: contact(at)robotcoral.de</p>

        <h4>{{ 'MODALS.IMPRESSUM.PRIVACY_STATEMENT.TITLE' | translate }}</h4>
        <p>{{ 'MODALS.IMPRESSUM.PRIVACY_STATEMENT.BODY' | translate }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./modal.styles.scss'],
  styles: [
    `
      ::ng-deep .modal-content {
        max-width: 350px;
      }
    `,
  ],
})
export class ImpressumModal {
  constructor(public activeModal: NgbActiveModal) {}
}
