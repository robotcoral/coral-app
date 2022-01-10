import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  Type,
} from "@angular/core";
import { PaneComponent } from "./pane.component";

export type Tabs = { [key: string]: Type<Component> };

@Component({
  selector: "tabs",
  templateUrl: "./tabs.component.html",
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(PaneComponent) tabs!: QueryList<PaneComponent>;

  ngAfterContentInit(): void {
    let activeTab = this.tabs.find((tab) => tab.active);
    this.selectTab(activeTab || this.tabs.first);
  }

  selectTab(tab: PaneComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
  }
}
