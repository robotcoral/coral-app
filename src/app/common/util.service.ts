import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

export interface File {
  title: string;
  content: string;
  fileType: string;
}

@Injectable({ providedIn: "root" })
export class UtilService {
  private downloadElement: HTMLElement;
  private uploadElement: HTMLInputElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  dyanmicDownloadByHtmlTag(file: File) {
    if (!this.downloadElement) {
      this.downloadElement = this.document.createElement("a");
    }
    this.downloadElement.setAttribute(
      "href",
      `data:${file.fileType};charset=utf-8,${encodeURIComponent(file.content)}`
    );
    this.downloadElement.setAttribute("download", file.title);

    this.downloadElement.click();
  }

  upload(callback: Function, fileTypes: string = ".coralworld,.json") {
    if (!this.uploadElement)
      this.uploadElement = this.document.getElementById(
        "fileUpload"
      ) as HTMLInputElement;
    this.uploadElement.setAttribute("accept", fileTypes);
    const eventListener = ($event) => {
      this.uploadElement.removeAllListeners("change");
      callback($event);
    };

    this.uploadElement.addEventListener("change", eventListener);
    this.uploadElement.click();
  }

  translateError(error: any) {
    this.translate.get(error.message).subscribe((translation: string) => {
      this.toastr.error(translation);
    });
  }
}
