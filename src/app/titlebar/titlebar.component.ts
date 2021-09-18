import { Component } from '@angular/core';
import { EditorController } from '../common/editor.controller';
import { KarolInterpreter } from '../common/karol.interpreter';
import { SettingsModal, SETTINGSMODES } from '../common/modals';
import { ImpressumModal } from '../common/modals/impressum.modal';
import { InfoModal } from '../common/modals/info.modal';
import { UtilService } from '../common/util.service';
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
    private utilService: UtilService,
    private interpreter: KarolInterpreter
  ) {}

  onSettings = (mode: SETTINGSMODES) => {
    (
      this.utilService.openModal(SettingsModal)
        .componentInstance as SettingsModal
    ).setMode(mode);
  };

  titlebar: { [key: string]: { [key: string]: Function } } = {
    FILE: {
      NEW: () => this.eController.setState(),
      IMPORT: () => this.eController.import(),
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
      START: () => this.interpreter.play(),
      STEP: () => this.interpreter.step(),
      PAUSE_UNPAUSE: () => this.pauseUnpause(),
      STOP: () => this.interpreter.stop(),
      RAISE_SPEED: () => this.interpreter.raiseSpeed(),
      LOWER_SPEED: () => this.interpreter.lowerSpeed(),
      RESET_WORLD: null,
    },
    EDITOR: {
      ZOOM_IN: () => this.eController.zoomIn(),
      ZOOM_OUT: () => this.eController.zoomOut(),
      RESET: () => this.eController.resetFontSize(),
      SETTINGS: () => this.onSettings(SETTINGSMODES.EDITOR),
      SEARCH_AND_REPLACE: () => this.eController.openSearchPanel(),
    },
    WORLD: {
      IMPORT: () => this.gbController.importWorld(),
      EXPORT: () => this.gbController.exportWorld(),
      RESET: () => this.gbController.reset(),
      SAVE: () => this.gbController.saveWorld(),
      SETTINGS: () => this.onSettings(SETTINGSMODES.WORLD),
    },
    HELP: {
      DOCUMENTATION: () => window.open('https://docs.robotcoral.de'),
      INFO: () => this.utilService.openModal(InfoModal),
      IMPRESSUM: () => this.utilService.openModal(ImpressumModal),
      SUPPORT_US: () => window.open('https://ko-fi.com/robotcoral'),
    },
  };

  pauseUnpause() {
    if (this.interpreter.pause) this.interpreter.play();
    else this.interpreter.pause();
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  };
}
