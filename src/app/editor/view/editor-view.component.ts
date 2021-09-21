import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { indentUnit } from '@codemirror/language';
import { Compartment } from '@codemirror/state';
import { EditorController } from 'src/app/common/editor.controller';
import { KarolInterpreter } from 'src/app/common/karol.interpreter';
import { Settings } from 'src/app/common/settings.schema';
import { SettingsService } from 'src/app/common/settings.service';
import { customSetup, EditorState, EditorView } from '../util/codemirror.setup';

type EditorStateConfig = Parameters<typeof EditorState.create>[0];

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['../editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorViewComponent {
  compartment = new Compartment();
  sourceCode = '';
  config: EditorStateConfig = {
    extensions: [
      customSetup,
      this.compartment.of(EditorState.tabSize.of(4)),
      // Indent with Tab
      indentUnit.of('	'),
      EditorView.updateListener.of((update) => {
        if (!update.changes.empty) this.controller.unsavedChanges = true;
      }),
    ],
  };
  view: EditorView;
  fontSize: number = 16;

  @ViewChild('codemirrorhost') codemirrorhost: ElementRef = null;

  constructor(
    private controller: EditorController,
    private interpreter: KarolInterpreter,
    private settingsService: SettingsService
  ) {
    this.controller.setEditor(this);
    this.settingsService.onEditorSettingsChange.subscribe((settings) =>
      this.applySettings(settings)
    );
  }

  ngAfterViewInit() {
    this.config = this.config || {};
    const state = EditorState.create(this.config);
    this.view = new EditorView({
      state,
      parent: this.codemirrorhost.nativeElement,
    });
    this.interpreter.setEditor(this);
    window.addEventListener(
      'beforeunload',
      (event) => {
        if (!this.controller.unsavedChanges) return undefined;
        event.preventDefault();
        return;
      },
      { capture: true }
    );
  }

  applySettings(settings: Settings) {
    this.fontSize = settings.fontSize;
    if (!this.view) return;
    this.view.dispatch({
      effects: this.compartment.reconfigure(
        EditorState.tabSize.of(settings.tabWidth)
      ),
    });
  }
}
