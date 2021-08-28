import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinates3 } from 'src/app/gameboard/utils';

enum SETTINGSMODES {
  GENERAL = 'General',
  EDITOR = 'Editor',
  WORLD = 'World',
}

@Component({
  selector: 'settings-modal',
  templateUrl: './settings.modal.html',
  styleUrls: ['../modal.styles.scss', './settings.modal.scss'],
})
export class SettingsModal {
  @Input() options: Coordinates3;
  openTab: SETTINGSMODES = SETTINGSMODES.WORLD;
  modes = SETTINGSMODES;

  constructor(public activeModal: NgbActiveModal) {}

  onApply() {}

  originalOrder = (a: any, b: any): number => {
    return 0;
  };
}
