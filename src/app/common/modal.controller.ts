import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ModalController {
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
}
