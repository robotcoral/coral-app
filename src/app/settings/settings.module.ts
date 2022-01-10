import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SettingsComponent } from "./settings.component";

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, TranslateModule.forChild()],
  exports: [SettingsComponent],
})
export class SettingsModule {}
