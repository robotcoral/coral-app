import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { GeneralSettingsService } from "src/app/common/settings/general.settings.service";
import { MaterialColors } from "../utils";
import { COLORS, GameboardController } from "../utils/gameboard.controller";

export enum WORLDOBJECTTYPES {
  FLAG = "FLAG",
  CUBE = "CUBE",
  SLAB = "SLAB",
}

@Component({
  selector: "app-gameboard-controls",
  templateUrl: "./gameboard-controls.component.html",
  styleUrls: [
    "./gameboard-controls.component.scss",
    "../../app.component.scss",
  ],
})
export class GameboardControlsComponent {
  colors: MaterialColors = {
    [COLORS.RED]: "#121212",
    [COLORS.GREEN]: "#121212",
    [COLORS.BLUE]: "#121212",
    [COLORS.YELLOW]: "#121212",
  };
  color: COLORS = COLORS.RED;
  colorExpanded = false;
  colorCallback = ((e) => {
    if (!this.document.getElementById("colorMenu").contains(e.target)) {
      this.onColorMenu();
    }
  }).bind(this);

  modes: { [key in WORLDOBJECTTYPES]: string } = {
    SLAB: "assets/icons/fluent/ic_fluent_slab_24_regular.svg",
    CUBE: "assets/icons/fluent/ic_fluent_cube_24_regular.svg",
    FLAG: "assets/icons/fluent/ic_fluent_flag_24_regular.svg",
  };
  mode: WORLDOBJECTTYPES = WORLDOBJECTTYPES.SLAB;
  modeExpanded = false;
  modeCallback = ((e) => {
    if (!this.document.getElementById("modeMenu").contains(e.target)) {
      this.onModeMenu();
    }
  }).bind(this);

  settingsOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public controller: GameboardController,
    private settingsService: GeneralSettingsService
  ) {
    this.settingsService.onThemeChange.subscribe((theme) =>
      this.onThemeChange(theme.colors)
    );
  }

  onColorMenu() {
    this.colorExpanded = !this.colorExpanded;
    if (this.colorExpanded)
      this.document.addEventListener("click", this.colorCallback);
    else this.document.removeEventListener("click", this.colorCallback);
  }

  onColorSelect(color: string) {
    this.color = color as COLORS;
    this.onColorMenu();
  }

  onModeMenu() {
    this.modeExpanded = !this.modeExpanded;
    if (this.modeExpanded)
      this.document.addEventListener("click", this.modeCallback);
    else this.document.removeEventListener("click", this.modeCallback);
  }

  onModeSelect(mode: string) {
    this.mode = mode as WORLDOBJECTTYPES;
    this.onModeMenu();
  }

  onPlace() {
    this.controller.place({ mode: this.mode, color: this.color });
  }

  onPickUp() {
    this.controller.pickUp(this.mode);
  }

  onResize() {}

  onThemeChange(theme: MaterialColors) {
    this.colors = theme;
  }
}
