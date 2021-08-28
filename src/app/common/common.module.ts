import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EditorSettingsModal,
  ExportModal,
  GeneralSettingsModal,
  ImportModal,
  ResizeModal,
  SettingsModal,
  WorldSettingsModal,
} from './modals';

@NgModule({
  declarations: [
    ResizeModal,
    ExportModal,
    ImportModal,
    SettingsModal,
    WorldSettingsModal,
    GeneralSettingsModal,
    EditorSettingsModal,
  ],
  imports: [AngularCommonModule, FormsModule, ReactiveFormsModule],
})
export class CommonModule {}
