import { Injectable } from "@angular/core";
import { TabsComponent } from "./tabs.component";

@Injectable({
  providedIn: "root",
})
export class TabsService {
  private tabs: TabsComponent[] = [];

  register(tab: TabsComponent) {
    this.tabs.push(tab);
  }

  setTab(tabName: string, tabComponentName?: string) {
    this.tabs
      .filter((tab) => tab.name === tabComponentName)
      .forEach((tab) => tab.setTab(tabName));
  }
}
