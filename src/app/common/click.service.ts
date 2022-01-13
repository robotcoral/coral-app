import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ClickService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  addOutsideListener(element: Element): Promise<void> {
    return new Promise((resolve) => {
      const isVisible = (elem) =>
        !!elem &&
        !!(
          elem.offsetWidth ||
          elem.offsetHeight ||
          elem.getClientRects().length
        );

      const outsideClickListener = (event) => {
        if (!element.contains(event.target) && isVisible(element)) {
          removeClickListener();
          resolve();
        }
      };

      const removeClickListener = () => {
        this.document.removeEventListener("click", outsideClickListener);
      };

      this.document.addEventListener("click", outsideClickListener);
    });
  }
}
