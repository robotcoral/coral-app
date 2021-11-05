import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'editor-settings-modal',
  templateUrl: `./editor-settings.modal.html`,
  styleUrls: ['../modal.styles.scss', './settings.modal.scss'],
})
export class EditorSettingsModal {
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public settingsService: SettingsService
  ) {
    this.formGroup = this.formBuilder.group({
      fontsize: [settingsService.settings.globalSettings.fontSize],
      tabwidth: [settingsService.settings.globalSettings.tabWidth],
    });
  }

  onApply() {
    const tabWidth = this.formGroup.get('tabwidth').value;
    const fontSize = this.formGroup.get('fontsize').value;

    this.settingsService.saveEditorSettings({ fontSize, tabWidth });
  }
}
