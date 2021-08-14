import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Sprite, Application } from 'pixi.js';
import {
  EngineView,
  getEngineInstance,
  TEngineConfiguration,
} from 'traviso.js';

type ControlSprites = { zoomIn: Sprite; zoomOut: Sprite; centralize: Sprite };

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements AfterViewInit {
  canvas: HTMLElement;
  @ViewChild('gameboard')
  gameboardRef: ElementRef;
  gameboard: HTMLElement;
  pixiRoot: Application;
  engine: EngineView;
  instanceConfig: TEngineConfiguration = {
    mapDataPath: '../../assets/traviso/mapData.json', // the path to the json file that defines map data, required
    assetsToLoad: [
      '../../assets/traviso/assets_map.json',
      '../../assets/traviso/assets_characters.json',
    ],
    engineInstanceReadyCallback: this.onEngineInstanceReady.bind(this),
  };
  sprites: ControlSprites = { zoomIn: null, zoomOut: null, centralize: null };

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    this.gameboard = this.gameboardRef.nativeElement;
    this.pixiRoot = new Application({
      resizeTo: this.gameboard,
      backgroundColor: 0x6bacde,
    });

    this.gameboard.appendChild(this.pixiRoot.view);
    this.engine = getEngineInstance(this.instanceConfig);
    this.canvas = this.document.getElementsByTagName('canvas')[0];
  }

  positionControls() {
    // set positions
    this.sprites.zoomIn.position.x =
      this.pixiRoot.renderer.width - 8 - this.sprites.zoomIn.width;
    this.sprites.zoomIn.position.y =
      this.pixiRoot.renderer.height / 2 -
      8 -
      this.sprites.zoomIn.height -
      this.sprites.zoomOut.height / 2;

    this.sprites.zoomOut.position.x =
      this.pixiRoot.renderer.width - 8 - this.sprites.zoomOut.width;
    this.sprites.zoomOut.position.y =
      this.pixiRoot.renderer.height / 2 - this.sprites.zoomIn.height / 2;

    this.sprites.centralize.position.x =
      this.pixiRoot.renderer.width - 8 - this.sprites.centralize.width;
    this.sprites.centralize.position.y =
      this.pixiRoot.renderer.height / 2 + 8 + this.sprites.zoomOut.height / 2;
  }

  onEngineInstanceReady() {
    this.pixiRoot.stage.addChild(this.engine);

    this.pixiRoot.loader
      .add('zoomIn', '../../assets/traviso/btn_zoomIn.png')
      .add('zoomOut', '../../assets/traviso/btn_zoomOut.png')
      .add('centralize', '../../assets/traviso/btn_centralize.png');

    this.pixiRoot.loader.load((loader, resources) => {
      this.sprites = {
        zoomIn: new Sprite(resources.zoomIn.texture),
        zoomOut: new Sprite(resources.zoomOut.texture),
        centralize: new Sprite(resources.centralize.texture),
      };
    });

    this.pixiRoot.loader.onComplete.add(() => {
      this.pixiRoot.stage.addChild(this.sprites.zoomIn);
      this.pixiRoot.stage.addChild(this.sprites.zoomOut);
      this.pixiRoot.stage.addChild(this.sprites.centralize);

      this.positionControls();

      this.sprites.zoomIn['interactive'] = this.sprites.zoomIn['buttonMode'] =
        true;
      this.sprites.zoomOut['interactive'] = this.sprites.zoomOut['buttonMode'] =
        true;
      this.sprites.centralize['interactive'] = this.sprites.centralize[
        'buttonMode'
      ] = true;

      // add click callbacks
      this.sprites.zoomIn['click'] = this.sprites.zoomIn['tap'] = () => {
        this.engine.zoomIn(false);
      };

      this.sprites.zoomOut['click'] = this.sprites.zoomOut['tap'] = () => {
        this.engine.zoomOut(false);
      };

      this.sprites.centralize['click'] = this.sprites.centralize['tap'] =
        () => {
          this.engine.centralizeToCurrentExternalCenter(false);
        };
    });

    this.pixiRoot.renderer['on']('resize', this.positionControls.bind(this));
  }
}
