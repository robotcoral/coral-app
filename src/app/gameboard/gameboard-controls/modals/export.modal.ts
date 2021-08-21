import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdditionalWorldData } from '../../utils';

@Component({
  selector: 'export-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">Export World</h4>
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
        <form [formGroup]="formGroup">
          <div class="inputWrapper">
            <div class="nameField">Worldname:</div>
            <input type="text" name="name" formControlName="name" />
          </div>
          <div class="inputWrapper">
            <div class="nameField">Author:</div>
            <input type="text" name="author" formControlName="author" />
          </div>
          <div class="inputWrapper">
            <div class="nameField">Description:</div>
            <textarea
              type="text"
              name="description"
              formControlName="description"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="onApply()">
          Apply
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
  styles: [
    `
      ::ng-deep .custom-modal .modal-dialog {
        max-width: 500px;
        width: auto;
        min-width: none;
      }
    `,
  ],
})
export class ExportModal {
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      author: [''],
      description: [''],
    });
  }

  onApply() {
    const data: AdditionalWorldData = {};
    Object.entries(this.formGroup.value).forEach(([key, value]) => {
      if (value) data[key] = value;
    });
    this.activeModal.close(data);
  }
}
