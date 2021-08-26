import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ExportModal, ResizeModal, WarningModal } from 'src/app/common/modals';
import { AdditionalWorldData, Coordinates3 } from '../utils';
import { GameboardController } from '../utils/gameboard.controller';

export enum WORLDOBJECTTYPES {
  FLAG = 'FLAG',
  CUBE = 'CUBE',
  SLAB = 'SLAB',
}

export interface PlaceEvent {
  color: string;
  mode: WORLDOBJECTTYPES;
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

  modes: { [key in WORLDOBJECTTYPES]: string } = {
    SLAB: 'assets/icons/ic_fluent_slab_24_regular.svg',
    CUBE: 'assets/icons/ic_fluent_cube_24_regular.svg',
    FLAG: 'assets/icons/ic_fluent_flag_24_regular.svg',
  };
  mode: WORLDOBJECTTYPES = WORLDOBJECTTYPES.SLAB;
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
    public controller: GameboardController
  ) {}

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
    this.mode = mode as WORLDOBJECTTYPES;
    this.onModeMenu();
  }

  onPlace() {
    this.controller.place({ mode: this.mode, color: this.colors[this.color] });
  }

  onPickUp() {
    this.controller.pickUp(this.mode);
  }

  onReset() {
    const modalRef = this.controller.openModal(WarningModal);
    (modalRef.componentInstance as WarningModal).init({
      title: 'Reset World',
      description: 'Are you sure you want to reset the world?',
      successButton: 'Reset',
    });
    modalRef.result
      .then(() => {
        this.controller.reset();
      })
      .catch(() => {});
  }

  onResize() {
    const modalRef = this.controller.openModal(ResizeModal);

    modalRef.componentInstance.init(this.controller.getWorldSize());
    modalRef.result
      .then((coo: Coordinates3) => {
        this.controller.resize(coo);
      })
      .catch(() => {});
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];

    this.controller.importWorld(file);
  }

  onExport() {
    this.controller
      .openModal(ExportModal)
      .result.then((data: AdditionalWorldData) => {
        this.controller.exportWorld(data);
      })
      .catch(() => {});
  }

  onSave() {
    const modalRef = this.controller.openModal(WarningModal);
    (modalRef.componentInstance as WarningModal).init({
      title: 'Save world as default',
      description:
        'Do you want to save this world as default? Resetting will then return the world to this state.',
      successButton: 'Save',
    });
    modalRef.result
      .then(() => {
        this.controller.saveWorld();
      })
      .catch(() => {});
  }
}
