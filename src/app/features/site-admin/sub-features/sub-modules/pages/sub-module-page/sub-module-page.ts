import { Component, signal } from '@angular/core';
import { MenuItemComponent } from '../../../../../../shared/components/ui/menu-item/menu-item';
import { RepositaryPage } from '../repositary-page/repositary-page';
import { ConfigurationPage } from '../configuration-page/configuration-page';

import { ReportsPage } from '../reports-page/reports-page'
import { SettingsPage } from '../settings-page/settings-page';
import { ContractsPage } from "../contracts-page/contracts-page";
import { LibraryPage } from "../library-page/library-page";

@Component({
  selector: 'app-sub-module-page',
  imports: [
    MenuItemComponent,
    RepositaryPage,
    ConfigurationPage,
    ReportsPage,
    SettingsPage,
    ContractsPage,
    LibraryPage
],
  templateUrl: './sub-module-page.html',
  styleUrl: './sub-module-page.css'
})
export class SubModulePage {
  menuItems = signal([
    { name: 'Contracts' },
    { name: 'Repository' },
    { name: 'Configuration' },
    { name: 'Library' },
    { name: 'Reports' },
    { name: 'Settings' },
  ]);

  // A signal to track the currently selected item.
  selectedItem = signal('Contracts');

  /**
   * Updates the selected item when a menu item is clicked.
   * @param name The name of the item to select.
   */
  selectItem(name: string): void {
    this.selectedItem.set(name);
  }
}
