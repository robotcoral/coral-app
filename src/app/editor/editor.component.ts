import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
import { EditorController } from '../common/editor.controller';

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
  state: EditorState;

  @ViewChild('codemirrorhost') codemirrorhost: ElementRef = null;

  constructor(private controller: EditorController) {
    this.controller.editor = this;
  }

  ngAfterViewInit(): void {
    this.config = this.config || {};
    this.state = EditorState.create(this.config);
    this.editor = new EditorView({
      state: this.state,
      parent: this.codemirrorhost.nativeElement,
    });
  }
}
