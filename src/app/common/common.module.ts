import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResizeModal } from './modals';
import { ExportModal } from './modals/export.modal';
import { ImportModal } from './modals/import.modal';

@NgModule({
  declarations: [ResizeModal, ExportModal, ImportModal],
  imports: [AngularCommonModule, FormsModule, ReactiveFormsModule],
})
export class CommonModule {}
