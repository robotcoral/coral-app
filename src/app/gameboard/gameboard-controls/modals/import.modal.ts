import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorldFile } from '../../utils';

@Component({
  selector: 'import-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">Import World</h4>
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
            <input
              type="text"
              name="name"
              formControlName="name"
              [attr.disabled]="true"
            />
          </div>
          <div class="inputWrapper">
            <div class="nameField">Author:</div>
            <input
              type="text"
              name="author"
              formControlName="author"
              [attr.disabled]="true"
            />
          </div>
          <div class="inputWrapper">
            <div class="nameField">Description:</div>
            <textarea
              type="text"
              name="description"
              formControlName="description"
              [attr.disabled]="true"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.close()"
        >
          Load
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
export class ImportModal {
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  init(worldFile: WorldFile) {
    this.formGroup = this.formBuilder.group({
      name: [worldFile.world_data.name],
      author: [worldFile.world_data.author],
      description: [worldFile.world_data.description],
    });
  }
}
