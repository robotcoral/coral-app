import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';

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
    extensions: [basicSetup],
  };
  editor: EditorView;

  @ViewChild('codemirrorhost') codemirrorhost: ElementRef = null;

  ngAfterViewInit(): void {
    this.config = this.config || {};
    const state = EditorState.create(this.config);
    this.init(state);
  }

  init(state: EditorState) {
    this.editor = new EditorView({
      state,
      parent: this.codemirrorhost.nativeElement,
    });
  }
}
