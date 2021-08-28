import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinates3 } from 'src/app/gameboard/utils';

@Component({
  selector: 'editor-settings-modal',
  templateUrl: `./editor-settings.modal.html`,
  styleUrls: ['../modal.styles.scss', './settings.modal.scss'],
})
export class EditorSettingsModal {
  @Input() options: Coordinates3;

  constructor(public activeModal: NgbActiveModal) {}

  onApply() {}
}
