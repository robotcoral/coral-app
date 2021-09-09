import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EditorControlsComponent } from './controls/editor-controls.component';
import { EditorComponent } from './editor.component';
import { EditorViewComponent } from './view/editor-view.component';

@NgModule({
  imports: [AngularSvgIconModule, TranslateModule.forChild(), CommonModule],
  declarations: [EditorComponent, EditorViewComponent, EditorControlsComponent],
  exports: [EditorComponent],
})
export class EditorModule {}
