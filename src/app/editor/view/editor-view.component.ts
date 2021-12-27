import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { indentUnit } from "@codemirror/language";
import { Compartment, StateEffect } from "@codemirror/state";
import { EditorController } from "src/app/common/editor.controller";
import { KarolInterpreter } from "src/app/common/karol.interpreter";
import { GlobalSettings, LANGUAGES } from "src/app/common/settings.schema";
import { SettingsService } from "src/app/common/settings.service";
import { codemirrorGermanPhrases } from "src/assets/i18n/codemirror.german";
import { environment } from "src/environments/environment";
import { customSetup, EditorState, EditorView } from "../util/codemirror.setup";

type EditorStateConfig = Parameters<typeof EditorState.create>[0];

@Component({
  selector: "app-editor-view",
  templateUrl: "./editor-view.component.html",
  styleUrls: ["../editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EditorViewComponent {
  compartment = new Compartment();
  sourceCode = "";
  config: EditorStateConfig;
  view: EditorView;

  @ViewChild("codemirrorhost") codemirrorhost: ElementRef = null;

  constructor(
    private controller: EditorController,
    private interpreter: KarolInterpreter,
    public settingsService: SettingsService
  ) {
    this.init();
    this.controller.setEditor(this);
    this.settingsService.onEditorSettingsChange.subscribe((settings) =>
      this.applySettings(settings)
    );
  }

  private init() {
    const extensions = [
      customSetup,
      this.compartment.of(
        EditorState.tabSize.of(
          this.settingsService.settings.globalSettings.tabWidth
        )
      ),
      // Indent with Tab
      indentUnit.of("	"),
      EditorView.updateListener.of((update) => {
        if (!update.changes.empty) this.controller.unsavedChanges = true;
      }),
    ];
    if (
      this.settingsService.settings.globalSettings.language === LANGUAGES.German
    ) {
      extensions.push(EditorState.phrases.of(codemirrorGermanPhrases));
    }
    this.config = {
      extensions,
    };
  }

  ngAfterViewInit() {
    this.config = this.config || {};
    const state = EditorState.create(this.config);
    this.view = new EditorView({
      state,
      parent: this.codemirrorhost.nativeElement,
    });
    this.interpreter.setEditor(this);
    if (environment.production) {
      this.addUnloadHandler();
    }
  }

  private addUnloadHandler() {
    window.addEventListener(
      "beforeunload",
      (event) => {
        if (!this.controller.unsavedChanges) return undefined;
        event.preventDefault();
        event.returnValue = ""; // needed for Microsoft Edge compability
      },
      { capture: true }
    );
  }

  applySettings(settings: Partial<GlobalSettings>) {
    if (!this.view) return;
    const effects: StateEffect<unknown>[] = [];
    if (settings.tabWidth) {
      effects.push(
        this.compartment.reconfigure(EditorState.tabSize.of(settings.tabWidth))
      );
    }
    if (settings.language) {
      const phrases =
        settings.language === LANGUAGES.German ? codemirrorGermanPhrases : {};
      effects.push(
        this.compartment.reconfigure(EditorState.phrases.of(phrases))
      );
    }
    this.view.dispatch({
      effects,
    });
  }
}
