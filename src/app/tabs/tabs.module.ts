import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PaneComponent } from "./pane.component";
import { TabsComponent } from "./tabs.component";

@NgModule({
  declarations: [TabsComponent, PaneComponent],
  imports: [CommonModule, TranslateModule.forChild()],
  exports: [TabsComponent, PaneComponent],
})
export class TabsModule {}
