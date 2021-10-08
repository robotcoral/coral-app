import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinates3 } from 'src/app/gameboard/utils';

@Component({
  selector: 'resize-modal',
  templateUrl: './resize.modal.html',
  styleUrls: ['./modal.styles.scss'],
  styles: [
    `
      input,
      textarea {
        text-align: right;
      }
    `,
  ],
})
export class ResizeModal {
  @Input() options: Coordinates3;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  init(coo: Coordinates3) {
    this.formGroup = this.formBuilder.group({
      length: [
        coo.x,
        [Validators.required, Validators.min(1), Validators.max(1024)],
      ],
      width: [
        coo.y,
        [Validators.required, Validators.min(1), Validators.max(1024)],
      ],
      height: [
        coo.z,
        [Validators.required, Validators.min(0), Validators.max(255)],
      ],
    });
  }

  onApply() {
    const size: Coordinates3 = {
      x: this.formGroup.value.width,
      y: this.formGroup.value.length,
      z: this.formGroup.value.height,
    };
    this.activeModal.close(size);
  }
}
