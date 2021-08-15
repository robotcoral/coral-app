import { Component } from '@angular/core';
import { basicSetup } from '@codemirror/basic-setup';
import { EditorStateConfig } from '@robotcoral/ngx-codemirror6';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  sourceCode = '';
  config: EditorStateConfig = {
    extensions: [basicSetup],
  };
}
