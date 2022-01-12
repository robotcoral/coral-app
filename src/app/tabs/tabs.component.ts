import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  Type,
} from "@angular/core";
import { TabPaneComponent } from "./tab-pane.component";

export type Tabs = { [key: string]: Type<Component> };

@Component({
  selector: "tabs",
  templateUrl: "./tabs.component.html",
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabPaneComponent) tabs!: QueryList<TabPaneComponent>;

  ngAfterContentInit(): void {
    let activeTab = this.tabs.find((tab) => tab.active);
    this.selectTab(activeTab || this.tabs.first);
  }

  selectTab(tab: TabPaneComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
  }
}
