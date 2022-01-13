import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TitlebarFolderComponent } from "./titlebar-folder/titlebar-folder.component";
import { TitlebarComponent } from "./titlebar.component";

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [TitlebarComponent, TitlebarFolderComponent],
  exports: [TitlebarComponent],
})
export class TitlebarModule {}
