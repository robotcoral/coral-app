import { Component } from "@angular/core";
import { KarolInterpreter } from "src/app/common/karol.interpreter";

enum PROGRAM_STATES {
  RUNNING = "status-running",
  PAUSED = "status-paused",
  STOPPED = "status-stopped",
}

@Component({
  selector: "app-editor-controls",
  templateUrl: "./editor-controls.component.html",
})
export class EditorControlsComponent {
  running: boolean = false;
  status: string = "svg";

  constructor(public interpreter: KarolInterpreter) {
    this.interpreter.running.subscribe((running) => {
      this.running = running;
      this.setStatus(running);
    });
    this.setStatus(false);
  }

  private setStatus(running: boolean) {
    const state = running
      ? PROGRAM_STATES.RUNNING
      : this.interpreter.paused
      ? PROGRAM_STATES.PAUSED
      : PROGRAM_STATES.STOPPED;

    this.status = state + " svg";
  }
}
