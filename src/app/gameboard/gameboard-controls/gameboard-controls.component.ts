import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { ModalController } from 'src/app/common/modal.controller';
import { ResizeModal } from 'src/app/common/modals';
import { Coordinates3 } from '../utils';
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
  styleUrls: [
    './gameboard-controls.component.scss',
    '../gameboard.component.scss',
  ],
})
export class GameboardControlsComponent implements AfterViewInit {
  @ViewChild('fileUpload')
  fileUpload: ElementRef;
  colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
  };
  color = 'red';
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
  modeExpanded = false;
  modeCallback = ((e) => {
    if (!this.document.getElementById('modeMenu').contains(e.target)) {
      this.onModeMenu();
    }
  }).bind(this);

  settingsOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public controller: GameboardController,
    private modal: ModalController
  ) {}

  ngAfterViewInit(): void {
    this.controller.upload = this.fileUpload.nativeElement;
  }

  onColorMenu() {
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
    this.controller.reset();
  }

  onResize() {
    const modalRef = this.modal.openModal(ResizeModal);

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
    this.controller.exportWorld();
  }

  onSave() {
    this.controller.saveWorld();
  }
}
