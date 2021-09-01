import { Injectable } from '@angular/core';
import { redo, undo } from '../editor/codemirror.setup';
import { EditorComponent } from '../editor/editor.component';
import { UtilService } from './modal.controller';

@Injectable({
  providedIn: 'root',
})
export class EditorController {
  private editor: EditorComponent;

  constructor(private utilService: UtilService) {}

  undo() {
    undo(this.editor.view);
  }

  redo() {
    redo(this.editor.view);
  }

  zoomIn() {
    this.editor.fontSize += 2;
  }

  zoomOut() {
    this.editor.fontSize -= 2;
  }

  resetFontSize() {
    this.editor.fontSize = this.editor.defaultFontSize;
  }

  cut() {
    this.clipboardEvent('cut');
  }

  copy() {
    this.clipboardEvent('copy');
  }

  paste() {
    this.clipboardEvent('paste');
  }

  export() {
    const code = this.editor.view.state.doc.toString();
    this.utilService.dyanmicDownloadByHtmlTag({
      title: 'code.txt',
      content: code,
      fileType: 'text/plain',
    });
  }

  private clipboardEvent(event: string) {
    this.editor.view.contentDOM.dispatchEvent(new ClipboardEvent(event));
  }

  setEditor(editor: EditorComponent) {
    this.editor = editor;
  }
}
