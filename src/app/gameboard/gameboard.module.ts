import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameboardControlsComponent } from './gameboard-controls/gameboard-controls.component';
import { ResizeModal } from './gameboard-controls/modals';
import { ExportModal } from './gameboard-controls/modals/export.modal';
import { ImportModal } from './gameboard-controls/modals/import.modal';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';
import { GameboardComponent } from './gameboard.component';
import { GameboardController } from './utils';

@NgModule({
  declarations: [
    GameboardComponent,
    GameboardControlsComponent,
    GameboardViewComponent,
    ResizeModal,
    ExportModal,
    ImportModal,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [GameboardController],

  exports: [GameboardComponent],
})
export class GameboardModule {}
