import { Component } from '@angular/core';
import { EditorController } from '../common/editor.controller';
import { SettingsModal, SETTINGSMODES } from '../common/modals';
import { GameboardController } from '../gameboard/utils';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  constructor(
    public gbController: GameboardController,
    private eController: EditorController
  ) {}

  onSettings = (mode: SETTINGSMODES) => {
    (
      this.gbController.openModal(SettingsModal)
        .componentInstance as SettingsModal
    ).setMode(mode);
  };

  titlebar: { [key: string]: { [key: string]: Function } } = {
    File: {
      New: null,
      Import: null,
      Export: null,
      Settings: () => this.onSettings(SETTINGSMODES.GENERAL),
    },
    Edit: {
      Undo: () => this.eController.undo(),
      Redo: () => this.eController.redo(),
      Cut: () => this.eController.cut(),
      Copy: () => this.eController.copy(),
      Paste: () => this.eController.paste(),
      'Toggle Comments': null,
    },
    Execute: {
      Start: null,
      Step: null,
      'Pause/Unpause': null,
      Stop: null,
      'Raise speed': null,
      'Lower speed': null,
      'Reset world on start': null,
    },
    Editor: {
      'Zoom in': () => this.eController.zoomIn(),
      'Zoom out': () => this.eController.zoomOut(),
      'Reset font size': () => this.eController.resetFontSize(),
      'Editor settings': () => this.onSettings(SETTINGSMODES.EDITOR),
    },
    World: {
      'Import world': () => this.gbController.upload.click(),
      'Export world': () => this.gbController.exportWorld(),
      'Reset World': () => this.gbController.reset(),
      'Set world reset point': () => this.gbController.saveWorld(),
      'World settings': () => this.onSettings(SETTINGSMODES.WORLD),
    },
    Help: {
      Documentation: () => window.open('https://docs.robotcoral.de'),
      Info: null,
      Impressum: null,
    },
  };

  originalOrder = (a: any, b: any): number => {
    return 0;
  };
}
