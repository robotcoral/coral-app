import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdditionalWorldData } from 'src/app/gameboard/utils';

@Component({
  selector: 'export-modal',
  templateUrl: './export.modal.html',
  styleUrls: ['./modal.styles.scss'],
  styles: [
    `
      ::ng-deep .modal-content {
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
