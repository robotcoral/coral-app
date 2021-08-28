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
    this.formGroup = this.formBuilder.group({
      theme: [settingsService.theme],
      language: [settingsService.language],
    });
    console.log(settingsService.theme);
  }

  onApply() {}

  originalOrder = (a: any, b: any): number => {
    return 0;
  };
}
