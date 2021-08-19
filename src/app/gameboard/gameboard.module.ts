import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameboardControlsComponent } from './gameboard-controls/gameboard-controls.component';
import { ResizeModal } from './gameboard-controls/modals';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';
import { Robot, World } from './gameboard-view/utils';
import { GameboardComponent } from './gameboard.component';

@NgModule({
  declarations: [
    GameboardComponent,
    GameboardControlsComponent,
    GameboardViewComponent,
    ResizeModal,
  ],
  providers: [World, Robot],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [GameboardComponent],
})
export class GameboardModule {}
