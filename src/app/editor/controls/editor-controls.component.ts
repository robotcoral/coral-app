import { Component } from '@angular/core';
import { KarolInterpreter } from 'src/app/common/karol.interpreter';

@Component({
  selector: 'app-editor-controls',
  templateUrl: './editor-controls.component.html',
  styleUrls: ['./editor-controls.component.scss', '../../app.component.scss'],
})
export class EditorControlsComponent {
  running: boolean = false;

  constructor(public interpreter: KarolInterpreter) {
    this.interpreter.running.subscribe((bool) => {
      this.running = bool;
    });
  }
}
