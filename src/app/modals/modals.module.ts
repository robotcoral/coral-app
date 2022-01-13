import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ConfirmComponent } from "./confirm.component";

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent],
})
export class ModalsModule {}
