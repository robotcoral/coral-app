import { Injectable } from '@angular/core';
import { redo, undo } from '../editor/codemirror.setup';
import { EditorComponent } from '../editor/editor.component';

@Injectable({
  providedIn: 'root',
})
export class EditorController {
  editor: EditorComponent;

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

  private clipboardEvent(event: string) {
    this.editor.view.contentDOM.dispatchEvent(new ClipboardEvent(event));
  }
}
