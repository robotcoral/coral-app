import { Component } from '@angular/core';
import { EditorController } from '../common/editor.controller';
import { UtilService } from '../common/modal.controller';
import { SettingsModal, SETTINGSMODES } from '../common/modals';
import { ImpressumModal } from '../common/modals/impressum.modal';
import { InfoModal } from '../common/modals/info.modal';
import { GameboardController } from '../gameboard/utils';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  constructor(
    public gbController: GameboardController,
    private eController: EditorController,
    private utilService: UtilService
  ) {}

  onSettings = (mode: SETTINGSMODES) => {
    (
      this.utilService.openModal(SettingsModal)
        .componentInstance as SettingsModal
    ).setMode(mode);
  };

  titlebar: { [key: string]: { [key: string]: Function } } = {
    FILE: {
      NEW: null,
      IMPORT: null,
      EXPORT: () => this.eController.export(),
      SETTINGS: () => this.onSettings(SETTINGSMODES.GENERAL),
    },
    EDIT: {
      UNDO: () => this.eController.undo(),
      REDO: () => this.eController.redo(),
      CUT: () => this.eController.cut(),
      COPY: () => this.eController.copy(),
      PASTE: () => this.eController.paste(),
      TOGGLE_COMMENTS: null,
    },
    EXECUTE: {
      START: null,
      STEP: null,
      PAUSE_UNPAUSE: null,
      STOP: null,
      RAISE_SPEED: null,
      LOWER_SPEED: null,
      RESET_WORLD: null,
    },
    EDITOR: {
      ZOOM_IN: () => this.eController.zoomIn(),
      ZOOM_OUT: () => this.eController.zoomOut(),
      RESET: () => this.eController.resetFontSize(),
      SETTINGS: () => this.onSettings(SETTINGSMODES.EDITOR),
    },
    WORLD: {
      IMPORT: () => this.gbController.upload.click(),
      EXPORT: () => this.gbController.exportWorld(),
      RESET: () => this.gbController.reset(),
      SAVE: () => this.gbController.saveWorld(),
      SETTINGS: () => this.onSettings(SETTINGSMODES.WORLD),
    },
    HELP: {
      DOCUMENTATION: () => window.open('https://docs.robotcoral.de'),
      INFO: () => this.utilService.openModal(InfoModal),
      IMPRESSUM: () => this.utilService.openModal(ImpressumModal),
    },
  };

  originalOrder = (a: any, b: any): number => {
    return 0;
  };
}
