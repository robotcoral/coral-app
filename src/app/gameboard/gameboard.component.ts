import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '../common/settings.service';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';
import { GameboardController } from './utils';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent {
  @ViewChild(GameboardViewComponent)
  gameboardView: GameboardViewComponent;

  constructor(
    public settingsService: SettingsService,
    public controller: GameboardController
  ) {}

  onResize() {
    this.gameboardView.onWindowResize();
  }

  onCameraReset() {
    this.gameboardView.resetCamera();
  }
}
