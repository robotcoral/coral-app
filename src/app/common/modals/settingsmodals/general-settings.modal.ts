import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LANGUAGES, THEMES } from '../../settings.schema';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'general-settings-modal',
  templateUrl: `./general-settings.modal.html`,
  styleUrls: ['../modal.styles.scss', './settings.modal.scss'],
})
export class GeneralSettingsModal {
  formGroup: FormGroup;

  themes = THEMES;
  languages = LANGUAGES;
  touchUIActive: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public settingsService: SettingsService
  ) {
    this.formGroup = this.formBuilder.group({
      theme: [settingsService.settings.globalSettings.theme],
      language: [settingsService.settings.globalSettings.language],
      touchUIActive: settingsService.settings.globalSettings.touchUIActive,
      newFlags: settingsService.settings.globalSettings.newFlags,
    });
  }

  onApply() {
    const theme = this.formGroup.get('theme').value as unknown as
      | THEMES
      | 'auto';
    const language = this.formGroup.get('language')
      .value as unknown as LANGUAGES;
    const touchUIActivate = this.formGroup.get('touchUIActive').value;
    const legacyFlags = this.formGroup.get('newFlags').value;

    this.settingsService.changeUISettings(
      theme,
      language,
      touchUIActivate,
      legacyFlags
    );
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  };
}
