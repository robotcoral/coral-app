import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameboardControlsComponent } from './gameboard-controls/gameboard-controls.component';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';
import { GameboardComponent } from './gameboard.component';

@NgModule({
  declarations: [
    GameboardComponent,
    GameboardControlsComponent,
    GameboardViewComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [GameboardComponent],
})
export class GameboardModule {}
