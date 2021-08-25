import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameboardControlsComponent } from './gameboard-controls/gameboard-controls.component';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';
import { GameboardComponent } from './gameboard.component';
import { GameboardController } from './utils';

@NgModule({
  declarations: [
    GameboardComponent,
    GameboardControlsComponent,
    GameboardViewComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [GameboardController],

  exports: [GameboardComponent],
})
export class GameboardModule {}
