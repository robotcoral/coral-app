import { Component } from '@angular/core';
import { SettingsModal } from '../common/modals';
import { GameboardController } from '../gameboard/utils';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  constructor(public controller: GameboardController) {}

  openSettings() {
    this.controller.openModal(SettingsModal);
  }
}
