import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
  imports: [
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
})
export class CommonModule {}
