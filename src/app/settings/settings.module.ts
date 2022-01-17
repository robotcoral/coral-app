import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { GeneralSettingsComponent } from "./general-settings/general-settings.component";
import { SettingComponent } from "./setting/setting.component";
import { SettingsGroupComponent } from "./settings-group/settings-group.component";
import { WorldSettingsComponent } from "./world-settings/world-settings.component";

@NgModule({
  declarations: [
    GeneralSettingsComponent,
    WorldSettingsComponent,
    SettingsGroupComponent,
    SettingComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [GeneralSettingsComponent, WorldSettingsComponent],
})
export class SettingsModule {}
