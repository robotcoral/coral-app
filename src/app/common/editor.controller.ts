import { Injectable } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

@Injectable({
  providedIn: 'root',
})
export class EditorController {
  editor: EditorComponent;
}
