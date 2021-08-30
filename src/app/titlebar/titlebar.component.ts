import { Component } from '@angular/core';
import { SettingsModal, SETTINGSMODES } from '../common/modals';
import { GameboardController } from '../gameboard/utils';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  constructor(public controller: GameboardController) {}

  onSettings = (mode: SETTINGSMODES) => {
    (
      this.controller.openModal(SettingsModal)
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
      'Import world': null,
      'Export world': null,
      'Reset World': () => this.controller.reset(),
      'Set world reset point': () => this.controller.saveWorld(),
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
