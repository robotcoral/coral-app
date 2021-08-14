import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  sourceCode = '';
  readonly codemirrorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: { name: 'javascript', typescript: true },
  };
}
