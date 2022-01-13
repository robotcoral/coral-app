import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TabPaneComponent } from "./tab-pane.component";
import { TabsComponent } from "./tabs.component";
import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
  declarations: [TabsComponent, TabPaneComponent],
  imports: [CommonModule, TranslateModule.forChild(), AngularSvgIconModule],
  exports: [TabsComponent, TabPaneComponent],
})
export class TabsModule {}
