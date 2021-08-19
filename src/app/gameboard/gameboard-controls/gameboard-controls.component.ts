import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinates3 } from '../utils';
import { GameboardController } from '../utils/gameboard.controller';
import { ResizeModal } from './modals';

export enum MODES {
  FLAG = 'FLAG',
  CUBE = 'CUBE',
  SLAB = 'SLAB',
}

export interface PlaceEvent {
  color: string;
  mode: MODES;
}

@Component({
  selector: 'app-gameboard-controls',
  templateUrl: './gameboard-controls.component.html',
  styleUrls: ['./gameboard-controls.component.scss'],
})
export class GameboardControlsComponent {
  colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
  };
  color = 'red';
  colorStyle = '';
  colorExpanded = false;
  colorCallback = ((e) => {
    if (!this.document.getElementById('colorMenu').contains(e.target)) {
      this.onColorMenu();
    }
  }).bind(this);

  modes: { [key in MODES]: string } = {
    SLAB: 'assets/icons/ic_fluent_slab_24_regular.svg',
    CUBE: 'assets/icons/ic_fluent_cube_24_regular.svg',
    FLAG: 'assets/icons/ic_fluent_flag_24_regular.svg',
  };
  mode: MODES = MODES.CUBE;
  modeStyle = '';
  modeExpanded = false;
  modeCallback = ((e) => {
    if (!this.document.getElementById('modeMenu').contains(e.target)) {
      this.onModeMenu();
    }
  }).bind(this);

  settingsOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal,
    private controller: GameboardController
  ) {}

  onMove() {
    this.controller.move();
  }

  onRotate(dir = 1) {
    this.controller.rotate(dir);
  }

  onColorMenu() {
    this.colorStyle = this.colorExpanded
      ? ''
      : 'position:absolute; margin-top:-6.75rem; background-color: white; box-shadow: 0 0 2px 2px lightgray';
    this.colorExpanded = !this.colorExpanded;
    if (this.colorExpanded)
      this.document.addEventListener('click', this.colorCallback);
    else this.document.removeEventListener('click', this.colorCallback);
  }

  onColorSelect(color: string) {
    this.color = color;
    this.onColorMenu();
  }

  onModeMenu() {
    this.modeStyle = this.modeExpanded
      ? ''
      : 'position:absolute; margin-top:-6.75rem; background-color: white; box-shadow: 0 0 2px 2px lightgray';
    this.modeExpanded = !this.modeExpanded;
    if (this.modeExpanded)
      this.document.addEventListener('click', this.modeCallback);
    else this.document.removeEventListener('click', this.modeCallback);
  }

  onModeSelect(mode: string) {
    this.mode = mode as MODES;
    this.onModeMenu();
  }

  onPlace() {
    this.controller.place({ mode: this.mode, color: this.colors[this.color] });
  }

  onPickUp() {
    this.controller.pickUp(this.mode);
  }

  onReset() {
    this.controller.reset();
  }

  onResize() {
    const modalRef = this.modalService.open(ResizeModal, {
      backdrop: false,
      centered: true,
      windowClass: 'custom-modal',
    });

    modalRef.componentInstance.init(this.controller.getWorldSize());
    modalRef.result
      .then((coo: Coordinates3) => {
        this.controller.resize(coo);
      })
      .catch(() => {});
  }
}
