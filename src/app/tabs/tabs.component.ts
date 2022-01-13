import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  Type,
} from "@angular/core";

import { TabPaneComponent } from "./tab-pane.component";
import { TabsService } from "./tabs.service";

export type Tabs = { [key: string]: Type<Component> };

@Component({
  selector: "tabs",
  templateUrl: "./tabs.component.html",
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabPaneComponent) tabs!: QueryList<TabPaneComponent>;
  @Input() name: string;

  constructor(private tabsService: TabsService) {
    tabsService.register(this);
  }

  ngAfterContentInit(): void {
    let activeTab = this.tabs.find((tab) => tab.active);
    this.selectTab(activeTab || this.tabs.first);
  }

  selectTab(tab: TabPaneComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
  }

  setTab(tabTitle: string) {
    const matchTab = this.tabs.find((tab) => tab.title == tabTitle);
    if (matchTab) {
      this.tabs.forEach((tab) => (tab.active = false));
      matchTab.active = true;
    }
  }
}
