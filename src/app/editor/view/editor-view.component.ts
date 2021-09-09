import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EditorController } from 'src/app/common/editor.controller';
import { KarolInterpreter } from 'src/app/common/karol.interpreter';
import { customSetup, EditorState, EditorView } from '../util/codemirror.setup';

type EditorStateConfig = Parameters<typeof EditorState.create>[0];

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['../editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorViewComponent implements AfterViewInit {
  sourceCode = '';
  config: EditorStateConfig = {
    extensions: [customSetup],
  };
  view: EditorView;
  fontSize: number;
  defaultFontSize: number;

  @ViewChild('codemirrorhost') codemirrorhost: ElementRef = null;

  constructor(
    private controller: EditorController,
    private interpreter: KarolInterpreter,
    window: Window,
    @Inject(DOCUMENT) document: Document
  ) {
    this.controller.setEditor(this);
    this.fontSize = parseInt(
      window.getComputedStyle(document.documentElement)['font-size']
    );
    this.defaultFontSize = this.fontSize;
  }

  ngAfterViewInit(): void {
    this.config = this.config || {};
    const state = EditorState.create(this.config);
    this.view = new EditorView({
      state,
      parent: this.codemirrorhost.nativeElement,
    });
    this.interpreter.setEditor(this);
  }
}
