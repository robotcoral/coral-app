import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EditorController } from '../common/editor.controller';
import { customSetup, EditorState, EditorView } from './codemirror.setup';

type EditorStateConfig = Parameters<typeof EditorState.create>[0];

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent {
  sourceCode = '';
  config: EditorStateConfig = {
    extensions: [customSetup],
  };
  view: EditorView;
  state: EditorState;
  fontSize: number;
  defaultFontSize: number;

  @ViewChild('codemirrorhost') codemirrorhost: ElementRef = null;

  constructor(
    private controller: EditorController,
    window: Window,
    @Inject(DOCUMENT) document: Document
  ) {
    this.controller.editor = this;
    this.fontSize = parseInt(
      window.getComputedStyle(document.documentElement)['font-size']
    );
    this.defaultFontSize = this.fontSize;
  }

  ngAfterViewInit(): void {
    this.config = this.config || {};
    this.state = EditorState.create(this.config);
    this.view = new EditorView({
      state: this.state,
      parent: this.codemirrorhost.nativeElement,
    });
  }
}
