import { Component, ViewEncapsulation } from '@angular/core';
import { EditorState } from './util/codemirror.setup';

type EditorStateConfig = Parameters<typeof EditorState.create>[0];

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent {}
