import { Injectable } from '@angular/core';
import * as karol from '@robotcoral/lang-karol';
import { Subject } from 'rxjs';
import { EditorViewComponent } from '../editor/view/editor-view.component';
import { WORLDOBJECTTYPES } from '../gameboard/gameboard-controls/gameboard-controls.component';
import { CARDINALS, GameboardController } from '../gameboard/utils';
import { Identifiers } from './identifiers';
import { SettingsService } from './settings.service';

type KarolMethods = {
  [key in Identifiers]: (param?: string) => void | boolean;
};

const TIMEOUT = 500;

@Injectable()
export class KarolInterpreter {
  running: Subject<boolean> = new Subject<boolean>();
  private paused = false;
  private editor: EditorViewComponent;
  private statements: Generator<unknown, any, unknown>;
  private interval: any;
  private callback = () => {
    const result = this.statements.next();
    if (!result.done) return;
    clearInterval(this.interval);
    this.running.next(false);
  };
  private audio: HTMLAudioElement;
  private methods: KarolMethods = {
    Schritt: (param) => {
      this.move(param);
    },
    LinksDrehen: () => {
      this.controller.rotate();
    },
    RechtsDrehen: () => {
      this.controller.rotate(-1);
    },
    Hinlegen: (param) => {
      this.placeSlab(param);
    },
    Aufheben: (param) => {
      this.pickUpSlab(param);
    },
    MarkeSetzen: (param) => {
      this.placeFlag(param);
    },
    MarkeLöschen: () => {
      this.controller.pickUp(WORLDOBJECTTYPES.FLAG);
    },
    Warten: () => {},
    Ton: () => {
      this.sound();
    },
    Beenden: () => {
      this.stop();
    },
    IstWand: () => {
      return this.controller.isWall();
    },
    NichtIstWand: () => {
      return !this.controller.isWall();
    },
    IstZiegel: (param) => {
      return this.isSlab(param);
    },
    NichtIstZiegel: (param) => {
      return !this.isSlab(param);
    },
    IstMarke: () => {
      return this.controller.isFlag();
    },
    NichtIstMarke: (param) => {
      return !this.controller.isFlag(param);
    },
    IstNorden: () => {
      return this.controller.isCardinal(CARDINALS.NORTH);
    },
    IstOsten: () => {
      return this.controller.isCardinal(CARDINALS.EAST);
    },
    IstSüden: () => {
      return this.controller.isCardinal(CARDINALS.SOUTH);
    },
    IstWesten: () => {
      return this.controller.isCardinal(CARDINALS.WEST);
    },
    IstVoll: () => {
      return this.isFull();
    },
    NichtIstVoll: () => {
      return !this.isFull();
    },
    IstLeer: () => {
      return this.isEmpty();
    },
    NichtIstLeer: () => {
      return !this.isEmpty();
    },
    HatZiegel: (param) => {
      return this.hasSlabs(param);
    },
  };

  constructor(
    private controller: GameboardController,
    private settings: SettingsService
  ) {}

  play() {
    if (!this.paused) {
      const program = karol.compile(this.getEditorString());
      if (program.kind == 'error')
        return console.error(
          `Error: ${program.msg} at ${program.pos.from} to ${program.pos.to}`
        );
      this.statements = program.result(this.methods);
      if (this.settings.settings.resetOnStart) this.controller.reset(true);
    }
    this.running.next(true);
    this.paused = false;
    this.execute();
  }

  pause() {
    this.paused = true;
    this.running.next(false);
    clearInterval(this.interval);
  }

  stop() {
    this.paused = false;
    this.running.next(false);
    clearInterval(this.interval);
  }

  step() {
    this.statements.next();
  }

  private move(param: string) {
    const distance = Number.parseInt(param);
    if (!Number.isInteger(distance)) return this.controller.move();

    for (let i = 0; i < distance; i++) this.controller.move();
  }

  private placeSlab(param: string) {
    const amount = Number.parseInt(param);
    if (!Number.isInteger(amount)) {
      this.controller.place({
        mode: WORLDOBJECTTYPES.SLAB,
        color: param,
      });
      return;
    }

    for (let i = 0; i < amount; i++) {
      this.controller.place({
        mode: WORLDOBJECTTYPES.SLAB,
        color: '#ff0000',
      });
    }
  }

  private pickUpSlab(param: string) {
    const amount = Number.parseInt(param) || 1;
    for (let i = 0; i < amount; i++) {
      this.controller.pickUp();
    }
  }

  private isSlab(param: string) {
    const amount = Number.parseInt(param);
    if (!Number.isInteger(amount)) return this.controller.isSlabColor(param);

    return this.controller.isSlab(amount || 1);
  }

  private placeFlag(param: string) {
    this.controller.place({
      mode: WORLDOBJECTTYPES.FLAG,
      color: param,
    });
  }

  private isFull() {
    return (
      this.controller.getCurrentSlabs() ===
      this.controller.settingService.settings.maxSlabs
    );
  }

  private isEmpty() {
    return this.controller.getCurrentSlabs() === 0;
  }

  private hasSlabs(param: string) {
    const amount = Number.parseInt(param) || 1;
    return this.controller.getCurrentSlabs() > 1;
  }

  private execute(callback: () => void | boolean = this.callback) {
    this.interval = setInterval(callback, TIMEOUT);
  }

  private getEditorString() {
    return this.editor.view.state.doc.toString();
  }

  private sound() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.src = 'assets/audio/wilhelm.mp3';
      this.audio.load();
    }
    this.audio.play();
  }

  setEditor(editor: EditorViewComponent) {
    this.editor = editor;
  }
}
