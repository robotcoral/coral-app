import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'world-settings-modal',
  templateUrl: `./world-settings.modal.html`,
  styleUrls: ['../modal.styles.scss', './settings.modal.scss'],
})
export class WorldSettingsModal {
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) {
    this.formGroup = this.formBuilder.group({
      inventoryActive: [settingsService.settings.fileSettings.inventoryActive],
      resetWorldOnStart: [settingsService.settings.fileSettings.resetOnStart],
      maxSlabs: [
        settingsService.settings.fileSettings.maxSlabs,
        [Validators.required, Validators.min(1), Validators.max(1024)],
      ],
      startSlabs: [
        settingsService.settings.fileSettings.startSlabs,
        [Validators.required, Validators.min(0), Validators.max(256)],
      ],
    });
  }

  onApply() {
    this.settingsService.settings.fileSettings.inventoryActive =
      this.formGroup.get('inventoryActive').value;
    this.settingsService.settings.fileSettings.maxSlabs =
      this.formGroup.get('maxSlabs').value;
    this.settingsService.settings.fileSettings.startSlabs =
      this.formGroup.get('startSlabs').value;
    this.settingsService.settings.fileSettings.resetOnStart =
      this.formGroup.get('resetWorldOnStart').value;
    this.settingsService.saveSettings();

    this.activeModal.close();
  }
}
