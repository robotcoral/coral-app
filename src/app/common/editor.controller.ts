import { Injectable } from '@angular/core';
import { redo, undo } from '../editor/util/codemirror.setup';
import { EditorViewComponent } from '../editor/view/editor-view.component';
import { openSearchPanel } from '@codemirror/search';
import { SettingsService } from './settings.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class EditorController {
  private editor: EditorViewComponent;

  constructor(
    private utilService: UtilService,
    private settingsService: SettingsService
  ) {}

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
    this.editor.fontSize = this.settingsService.settings.fontSize;
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

  openSearchPanel() {
    openSearchPanel(this.editor.view);
  }

  export() {
    const code = this.editor.view.state.doc.toString();
    this.utilService.dyanmicDownloadByHtmlTag({
      title: 'code.txt',
      content: code,
      fileType: 'text/plain',
    });
    this.editor.unsavedChanges = false;
  }

  import() {
    const callback = async (event: Event) => {
      const file: File = (event.target as HTMLInputElement).files[0];
      try {
        if (!file) throw new Error('ERRORS.FILE_UPLOAD_FAILED');

        const text = await file.text();

        this.setState(text);
      } catch (error) {
        this.utilService.translateError(error);
      }
    };
    this.utilService.upload('.txt', callback);
  }

  setState(text = '') {
    const transaction = this.editor.view.state.update({
      changes: {
        from: 0,
        to: this.editor.view.state.doc.length,
        insert: text,
      },
    });
    this.editor.view.update([transaction]);
  }

  private clipboardEvent(event: string) {
    this.editor.view.contentDOM.dispatchEvent(new ClipboardEvent(event));
  }

  setEditor(editor: EditorViewComponent) {
    this.editor = editor;
  }
}
