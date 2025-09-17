import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Tabs } from "../../../../shared/components/tabs/tabs";
import { ModulePage } from "../../sub-features/modules/pages/module-page/module-page";
import { SubModulePage } from "../../sub-features/sub-modules/pages/sub-module-page/sub-module-page";
import { PackagesPage } from "../../sub-features/packages/pages/packages-page/packages-page";
import { OrganizationPage } from "../../sub-features/organization/pages/organization-page/organization-page";

/**
 * A container component for the site administration section.
 * It uses a tabbed interface to navigate between different admin features.
 */
@Component({
  selector: 'app-site-admin-page',
  standalone: true,
  imports: [Tabs, ModulePage, SubModulePage, PackagesPage, OrganizationPage],
  templateUrl: './site-admin-page.html',
  styleUrls: ['./site-admin-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteAdminPage {
  /**
   * Defines the configuration for the navigation tabs.
   */
  tabs = signal([
    { id: 'modules', label: 'Modules' },
    { id: 'sub-modules', label: 'Sub-Modules' },
    { id: 'packages', label: 'Packages' },
    { id: 'organizations', label: 'Organizations' },
  ]);

  /**
   * Tracks the ID of the currently active tab.
   */
  readonly currentTab = signal<string | null>('modules');

  /**
   * Updates the current tab when the user selects a new one.
   * @param tabId The ID of the selected tab.
   */
  setActiveTab(tabId:string){
    this.currentTab.set(tabId);
  }

}
