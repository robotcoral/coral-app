import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { EditorController } from "../common/editor.controller";
import { KarolInterpreter } from "../common/karol.interpreter";
import { GameboardController } from "../gameboard/utils";
import { TabsService } from "../tabs/tabs.service";

@Component({
  selector: "app-titlebar",
  templateUrl: "./titlebar.component.html",
})
export class TitlebarComponent {
  @ViewChild("titlebar")
  elementRef: ElementRef;

  originalOrder = () => 0;
  expanded = false;
  openFolder: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public gbController: GameboardController,
    private eController: EditorController,
    private interpreter: KarolInterpreter,
    private tabsService: TabsService
  ) {}

  titlebarEntries: { [key: string]: { [key: string]: Function } } = {
    FILE: {
      NEW: () => this.eController.setState(),
      IMPORT: () => this.eController.import(),
      EXPORT: () => this.eController.export(),
      EDITOR: () => this.tabsService.setTab("TABS.EDITOR", "left-tabs"),
      SETTINGS: () => this.tabsService.setTab("TABS.SETTINGS", "left-tabs"),
    },
    EDIT: {
      UNDO: () => this.eController.undo(),
      REDO: () => this.eController.redo(),
      CUT: () => this.eController.cut(),
      COPY: () => this.eController.copy(),
      PASTE: () => this.eController.paste(),
      TOGGLE_COMMENTS: () => null,
    },
    EXECUTE: {
      START: () => this.interpreter.play(),
      STEP: () => this.interpreter.step(),
      PAUSE_UNPAUSE: () => null,
      STOP: () => this.interpreter.stop(),
      RAISE_SPEED: () => this.interpreter.raiseSpeed(),
      LOWER_SPEED: () => this.interpreter.lowerSpeed(),
      RESET_WORLD: () => null,
    },
    EDITOR: {
      ZOOM_IN: () => this.eController.zoomIn(),
      ZOOM_OUT: () => this.eController.zoomOut(),
      RESET: () => this.eController.resetFontSize(),
      SETTINGS: () => null,
      SEARCH_AND_REPLACE: () => this.eController.openSearchPanel(),
    },
    WORLD: {
      IMPORT: () => this.gbController.importWorld(),
      EXPORT: () => this.gbController.exportWorld(),
      RESET: () => this.gbController.reset(),
      SAVE: () => null,
      SETTINGS: () => null,
    },
    HELP: {
      DOCUMENTATION: () => window.open("https://docs.robotcoral.de"),
      INFO: () => window.open("https://robotcoral.de"),
      IMPRESSUM: () => window.open("https://robotcoral.de/impressum"),
      SUPPORT_US: () => window.open("https://ko-fi.com/robotcoral"),
    },
  };

  click(open: boolean) {
    this.expanded = open;
    if (open) this.open();
  }

  open() {
    const isVisible = (elem) =>
      !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

    const element = this.elementRef.nativeElement;

    const outsideClickListener = (event) => {
      if (!element.contains(event.target) && isVisible(element)) {
        this.expanded = false;
        removeClickListener();
      }
    };

    const removeClickListener = () => {
      this.document.removeEventListener("click", outsideClickListener);
    };

    this.document.addEventListener("click", outsideClickListener);
  }
}
