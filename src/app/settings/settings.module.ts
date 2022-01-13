import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { SettingComponent } from "./setting/setting.component";
import { SettingsGroupComponent } from "./settings-group/settings-group.component";
import { SettingsComponent } from "./settings.component";

@NgModule({
  declarations: [SettingsComponent, SettingsGroupComponent, SettingComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
