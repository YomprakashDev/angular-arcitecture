import { Component, signal } from '@angular/core';
import { Tabs } from "../../../../shared/components/tabs/tabs";
import { ModulePage } from "../../sub-features/modules/pages/module-page/module-page";
import { SubModulePage } from "../../sub-features/sub-modules/pages/sub-module-page/sub-module-page";
import { PackagesPage } from "../../sub-features/packages/pages/packages-page/packages-page";
import { OrganizationPage } from "../../sub-features/organization/pages/organization-page/organization-page";
@Component({
  selector: 'app-site-admin-page',
  standalone: true,
  imports: [Tabs, ModulePage, SubModulePage, PackagesPage, OrganizationPage],
  templateUrl: './site-admin-page.html',
  styleUrls: ['./site-admin-page.css']
})
export class SiteAdminPage {
 tabs = signal([
    { id: 'modules', label: 'Modules' },
    { id: 'sub-modules', label: 'Sub-Modules' },
    { id: 'packages', label: 'Packages' },
    { id: 'organizations', label: 'Organizations' },
  ]);

  readonly currentTab = signal<string | null>('modules');

  setActiveTab(tabId:string){
    this.currentTab.set(tabId);
  }

}
