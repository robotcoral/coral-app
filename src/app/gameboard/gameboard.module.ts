import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { GameboardControlsComponent } from './gameboard-controls/gameboard-controls.component';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';
import { GameboardComponent } from './gameboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  declarations: [
    GameboardComponent,
    GameboardControlsComponent,
    GameboardViewComponent,
  ],
  exports: [GameboardComponent],
})
export class GameboardModule {}
