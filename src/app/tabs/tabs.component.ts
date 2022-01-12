import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  Type,
} from "@angular/core";
import { PaneComponent } from "./pane.component";
import { TabsService } from "./tabs.service";

export type Tabs = { [key: string]: Type<Component> };

@Component({
  selector: "tabs",
  templateUrl: "./tabs.component.html",
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(PaneComponent) tabs!: QueryList<PaneComponent>;
  @Input() name: string;

  constructor(private tabsService: TabsService) {
    tabsService.register(this);
  }

  ngAfterContentInit(): void {
    let activeTab = this.tabs.find((tab) => tab.active);
    this.selectTab(activeTab || this.tabs.first);
  }

  selectTab(tab: PaneComponent) {
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
