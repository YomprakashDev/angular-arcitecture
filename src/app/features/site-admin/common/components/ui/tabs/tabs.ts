import { Component, signal } from '@angular/core';
import { ModulePage } from "../../../../sub-features/modules/pages/module-page/module-page";
import { SubModulePage } from "../../../../sub-features/sub-modules/pages/sub-module-page/sub-module-page";

@Component({
  selector: 'app-tabs',
  imports: [ModulePage, SubModulePage],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs {
   tabs = signal([
    { id: 'modules', label: 'Modules' },
    { id: 'sub-modules', label: 'Sub-Modules' },
    { id: 'packages', label: 'Packages' },
    { id: 'organizations', label: 'Organizations' },
  ]);

  activeTab = signal('modules');

  selectTab(tabId: string) {
    this.activeTab.set(tabId);
  }

}
