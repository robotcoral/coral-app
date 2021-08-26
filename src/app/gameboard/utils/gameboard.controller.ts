import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportModal } from 'src/app/common/modals/import.modal';
import { SettingsService } from 'src/app/common/settings.service';
import {
  AdditionalWorldData,
  CARDINALS,
  Coordinates2,
  Coordinates3,
  GameboardModel,
} from '.';
import {
  PlaceEvent,
  WORLDOBJECTTYPES,
} from '../gameboard-controls/gameboard-controls.component';
import { WorldFile } from './world.schema';

@Injectable({
  providedIn: 'root',
})
export class GameboardController {
  private model: GameboardModel;
  private download: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private settingService: SettingsService
  ) {
    this.model = new GameboardModel(settingService);
  }

  move() {
    try {
      this.model.robot.move();
    } catch (error) {
      this.toastr.error(error);
    }
  }

  rotate(dir = 1) {
    this.model.robot.rotate(dir);
  }

  place(event: PlaceEvent) {
    try {
      const coo = this.model.robot.getMoveCoordinates();
      if (event.mode == WORLDOBJECTTYPES.SLAB) this.placeSlab(coo, event.color);
      else if (event.mode == WORLDOBJECTTYPES.CUBE)
        this.model.world.placeBlock(coo);
      else
        this.model.world.placeFlag(
          this.model.robot.getCurrentCoordinates(),
          event.color
        );
    } catch (error) {
      this.toastr.error(error);
    }
    console.log(this.model.currentSlabs);
  }

  private placeSlab(coo: Coordinates2, color: string) {
    if (this.settingService.settings.inventoryActive) {
      if (this.model.currentSlabs === 0)
        throw new Error('You have no slabs left in your inventory');
      this.model.world.placeSlab(coo, color);
      this.model.currentSlabs--;
    } else this.model.world.placeSlab(coo, color);
  }

  pickUp(mode: WORLDOBJECTTYPES) {
    try {
      const coo = this.model.robot.getMoveCoordinates();
      if (mode == WORLDOBJECTTYPES.SLAB) this.model.world.pickUpSlab(coo);
      else if (mode == WORLDOBJECTTYPES.CUBE) this.model.world.pickUpBlock(coo);
      else
        this.model.world.pickUpFlag(this.model.robot.getCurrentCoordinates());
    } catch (error) {
      this.toastr.error(error);
    }
  }

  isWall() {
    return this.model.world.outOfBounds(this.model.robot.getMoveCoordinates());
  }

  isSlab(amount = 1) {
    return this.model.world.isStackMinHeight(
      this.model.robot.getMoveCoordinates(),
      amount
    );
  }

  isSlabColor(color: string) {
    return this.model.world.isColor(
      this.model.robot.getMoveCoordinates(),
      color
    );
  }

  isCardinal(cardinal: CARDINALS): boolean {
    return this.model.robot.isCardinal(cardinal);
  }

  reset() {
    this.model.reset();
  }

  resize(coo: Coordinates3) {
    this.model.resize(coo);
  }

  getWorldSize() {
    return this.model.world.getWorldSize();
  }

  getWorld() {
    return this.model.world;
  }

  getRobot() {
    return this.model.robot;
  }

  exportWorld(data: AdditionalWorldData) {
    const worldFile = this.model.export(data);
    const text = JSON.stringify(worldFile, null, 2);
    this.dyanmicDownloadByHtmlTag(text);
  }

  async importWorld(file: File) {
    try {
      if (!file) throw new Error('File upload failed.\nPlease try again');

      const worldFile: WorldFile = this.model.import(await file.text());
      const modalRef = this.openModal(ImportModal);
      modalRef.componentInstance.init(worldFile);
      modalRef.result
        .then(() => {
          this.model.world.defaultWorld = worldFile.world_data;
          this.model.reset();
        })
        .catch(() => {});
    } catch (error) {
      this.toastr.error(error);
    }
  }

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

  private dyanmicDownloadByHtmlTag(text: string) {
    if (!this.download) {
      this.download = document.createElement('a');
    }
    const fileType = 'text/json';
    this.download.setAttribute(
      'href',
      `data:${fileType};charset=utf-8,${encodeURIComponent(text)}`
    );
    this.download.setAttribute('download', 'world.coralworld');

    this.download.click();
  }

  saveWorld() {
    const worldFile = this.model.export({});
    this.model.save(worldFile.world_data);
  }

  getCurrentSlabs() {
    return this.model.currentSlabs;
  }
}
