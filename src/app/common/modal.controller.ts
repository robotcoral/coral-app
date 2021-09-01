import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface File {
  title: string;
  content: string;
  fileType: string;
}

@Injectable({ providedIn: 'root' })
export class UtilService {
  private downloadElement: HTMLElement;
  private uploadElement: HTMLInputElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal
  ) {}

  openModal(content: any) {
    const modalRef = this.modalService.open(content, {
      backdrop: false,
      centered: true,
      windowClass: 'custom-modal',
    });
    const callback = (e: any) => {
      if (!this.document.getElementById('modal').contains(e.target)) {
        modalRef.dismiss();
      }
    };

    // makes sure the modal isn't immediately closed
    setTimeout(() => {
      this.document.addEventListener('click', callback);
    }, 0);

    modalRef.result.finally(() => {
      this.document.removeEventListener('click', callback);
    });
    return modalRef;
  }

  dyanmicDownloadByHtmlTag(file: File) {
    if (!this.downloadElement) {
      this.downloadElement = this.document.createElement('a');
    }
    this.downloadElement.setAttribute(
      'href',
      `data:${file.fileType};charset=utf-8,${encodeURIComponent(file.content)}`
    );
    this.downloadElement.setAttribute('download', file.title);

    this.downloadElement.click();
  }

  upload(fileTypes: string, callback: Function) {
    if (!this.uploadElement)
      this.uploadElement = this.document.getElementById(
        'fileUpload'
      ) as HTMLInputElement;
    this.uploadElement.setAttribute('accept', fileTypes);
    const eventListener = ($event) => {
      this.uploadElement.removeAllListeners('change');
      callback($event);
    };

    this.uploadElement.addEventListener('change', eventListener);
    this.uploadElement.click();
  }
}
