import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LANGUAGES, SettingsService, THEMES } from '../../settings.service';

@Component({
  selector: 'general-settings-modal',
  templateUrl: `./general-settings.modal.html`,
  styleUrls: ['../modal.styles.scss', './settings.modal.scss'],
})
export class GeneralSettingsModal {
  formGroup: FormGroup;

  themes = THEMES;
  languages = LANGUAGES;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public settingsService: SettingsService
  ) {
    console.log(settingsService.language);
    this.formGroup = this.formBuilder.group({
      theme: [settingsService.theme],
      language: [settingsService.language],
    });
  }

  onApply() {
    const theme = this.formGroup.get('theme').value as unknown as
      | THEMES
      | 'auto';
    const language = this.formGroup.get('language')
      .value as unknown as LANGUAGES;
    this.settingsService.saveGeneralSettings(theme, language);
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  };
}
