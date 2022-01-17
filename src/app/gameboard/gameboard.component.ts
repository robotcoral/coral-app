import { Component, OnInit, ViewChild } from "@angular/core";
import { SettingsService } from "../common/settings.service";
import { GameboardViewComponent } from "./gameboard-view/gameboard-view.component";
import { GameboardController } from "./utils";

@Component({
  selector: "app-gameboard",
  templateUrl: "./gameboard.component.html",
})
export class GameboardComponent implements OnInit {
  @ViewChild(GameboardViewComponent)
  gameboardView: GameboardViewComponent;

  constructor(
    public settingsService: SettingsService,
    public controller: GameboardController
  ) {}

  ngOnInit(): void {
    this.settingsService.ngOnInit();
  }

  onResize() {
    this.gameboardView.onWindowResize();
  }

  onCameraReset() {
    this.gameboardView.resetCamera();
  }
}
