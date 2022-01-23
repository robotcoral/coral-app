import { Injectable } from "@angular/core";
import { openSearchPanel } from "@codemirror/search";
import { ChangeSpec } from "@codemirror/state";
import { SimpleModalService } from "ngx-simple-modal";
import { redo, undo } from "../editor/util/codemirror.setup";
import { EditorViewComponent } from "../editor/view/editor-view.component";
import { ConfirmComponent } from "../modals/confirm.component";
import { GeneralSettingsService } from "./settings/general.settings.service";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root",
})
export class EditorController {
  private editor: EditorViewComponent;
  unsavedChanges: boolean = false;

  constructor(
    private utilService: UtilService,
    private settingsService: GeneralSettingsService,
    private modalService: SimpleModalService
  ) {}

  undo() {
    undo(this.editor.view);
  }

  redo() {
    redo(this.editor.view);
  }

  zoomIn() {
    const fontSize = this.settingsService.settings.font_size + 2;
    this.settingsService.setSetting("font_size", fontSize);
  }

  zoomOut() {
    const fontSize = this.settingsService.settings.font_size - 2;
    this.settingsService.setSetting("font_size", fontSize);
  }

  resetFontSize() {
    this.settingsService.setSetting("font_size", 16);
  }

  cut() {
    this.clipboardEvent("cut");
  }

  copy() {
    this.clipboardEvent("copy");
  }

  paste() {
    this.clipboardEvent("paste");
  }

  openSearchPanel() {
    openSearchPanel(this.editor.view);
  }

  exportToString() {
    return this.editor.view.state.doc.toString();
  }

  export() {
    this.utilService.dyanmicDownloadByHtmlTag({
      title: "code.txt",
      content: this.exportToString(),
      fileType: "text/plain",
    });
    this.unsavedChanges = false;
  }

  import() {
    const callback = async (event: Event) => {
      const file: File = (event.target as HTMLInputElement).files[0];
      try {
        if (!file) throw new Error("ERRORS.FILE_UPLOAD_FAILED");

        this.setState(await file.text());
      } catch (error) {
        this.utilService.translateError(error);
      }
    };
    this.utilService.upload(callback);
  }

  resetEditor() {
    const reset = () => {
      this.setState("");
      setTimeout(() => {
        this.unsavedChanges = false;
      }, 100);
    };

    if (!this.unsavedChanges) return reset();

    this.modalService
      .addModal(ConfirmComponent, {
        title: "MODALS.UNSAVED_CHANGES.TITLE",
        message: "MODALS.UNSAVED_CHANGES.DESCRIPTION",
      })
      .subscribe((confirm) => {
        if (confirm) reset();
      });
  }

  setState(text = "") {
    const changes: ChangeSpec = {
      from: 0,
      insert: text,
    };

    if (this.editor.view.state.doc.length) {
      changes.to = this.editor.view.state.doc.length;
    }

    const callback = () => {
      const transaction = this.editor.view.state.update({
        changes,
      });
      this.editor.view.update([transaction]);
    };

    return callback();
  }

  private clipboardEvent(event: string) {
    this.editor.view.contentDOM.dispatchEvent(new ClipboardEvent(event));
  }

  setEditor(editor: EditorViewComponent) {
    this.editor = editor;
  }
}
