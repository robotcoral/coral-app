import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { KarolInterpreter } from './karol.interpreter';
import {
  EditorSettingsModal,
  ExportModal,
  GeneralSettingsModal,
  ImportModal,
  ResizeModal,
  SettingsModal,
  WarningModal,
  WorldSettingsModal,
} from './modals';
import { ImpressumModal } from './modals/impressum.modal';
import { InfoModal } from './modals/info.modal';

@NgModule({
  declarations: [
    ResizeModal,
    ExportModal,
    ImportModal,
    SettingsModal,
    WorldSettingsModal,
    GeneralSettingsModal,
    EditorSettingsModal,
    WarningModal,
    ImpressumModal,
    InfoModal,
  ],
  providers: [KarolInterpreter],
  imports: [
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
})
export class CommonModule {}
