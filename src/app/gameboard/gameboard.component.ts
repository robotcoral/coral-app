import { Component, OnInit, ViewChild } from "@angular/core";
import { GeneralSettingsService } from "../common/settings/general.settings.service";
import { SettingsKeys } from "../common/settings/settings.schema";
import { WorldSettingsService } from "../common/settings/world.settings";
import { GameboardViewComponent } from "./gameboard-view/gameboard-view.component";
import { GameboardController } from "./utils";

@Component({
  selector: "app-gameboard",
  templateUrl: "./gameboard.component.html",
  styleUrls: ["../app.component.scss"],
})
export class GameboardComponent implements OnInit {
  @ViewChild(GameboardViewComponent)
  gameboardView: GameboardViewComponent;

  SettingsKeys = SettingsKeys;

  constructor(
    private generalSettingsService: GeneralSettingsService,
    public worldSettingsService: WorldSettingsService,
    public controller: GameboardController
  ) {}

  ngOnInit(): void {
    this.generalSettingsService.ngOnInit();
  }

  onResize() {
    this.gameboardView.onWindowResize();
  }

  onCameraReset() {
    this.gameboardView.resetCamera();
  }
}
