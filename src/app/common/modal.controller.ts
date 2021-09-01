import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface File {
  title: string;
  content: string;
  fileType: string;
}

@Injectable({ providedIn: 'root' })
export class ModalController {
  private download: HTMLElement;

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
    if (!this.download) {
      this.download = document.createElement('a');
    }
    this.download.setAttribute(
      'href',
      `data:${file.fileType};charset=utf-8,${encodeURIComponent(file.content)}`
    );
    this.download.setAttribute('download', file.title);

    this.download.click();
  }
}
