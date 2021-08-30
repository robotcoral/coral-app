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
      Undo: null,
      Redo: null,
      Cut: null,
      Copy: null,
      Paste: null,
      Search: null,
      'Search and Replace': null,
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
      'Zoom in': null,
      'Zoom out': null,
      'Reset font size': null,
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
