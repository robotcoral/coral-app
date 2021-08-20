import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  MODES,
  PlaceEvent,
} from '../gameboard-controls/gameboard-controls.component';
import { CARDINALS, Coordinates3 } from './coordinates';
import { GameboardModel } from './gameboard.model';

@Injectable()
export class GameboardController {
  private model: GameboardModel;
  private download: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService
  ) {
    this.model = new GameboardModel();
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
      if (event.mode == MODES.SLAB)
        this.model.world.placeSlab(coo, event.color);
      else if (event.mode == MODES.CUBE) this.model.world.placeBlock(coo);
      else
        this.model.world.placeFlag(
          this.model.robot.getCurrentCoordinates(),
          event.color
        );
    } catch (error) {
      this.toastr.error(error);
    }
  }

  pickUp(mode: MODES) {
    try {
      const coo = this.model.robot.getMoveCoordinates();
      if (mode == MODES.SLAB) this.model.world.pickUpSlab(coo);
      else if (mode == MODES.CUBE) this.model.world.pickUpBlock(coo);
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

  exportWorld() {
    const text = this.model.export();
    this.dyanmicDownloadByHtmlTag(text);
  }

  async importWorld(file: File) {
    try {
      if (!file) throw new Error('File upload failed.\nPlease try again');

      this.model.import(await file.text());
    } catch (error) {
      this.toastr.error(error);
    }
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

    var event = new MouseEvent('click');
    this.download.dispatchEvent(event);
  }
}
