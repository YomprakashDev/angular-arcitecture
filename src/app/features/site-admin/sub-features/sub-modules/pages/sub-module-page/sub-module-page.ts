import { Component, signal } from '@angular/core';
import { MenuItemComponent } from '../../../../../../shared/components/ui/menu-item/menu-item';
import { ContractsPageComponent } from '../contracts-page/contracts-page';
import { RepositoryPageComponent } from '../repository-page/repository-page';
import { ConfigurationPageComponent } from '../configuration-page/configuration-page';
import { LibraryPageComponent } from '../library-page/library-page';
import { ReportsPageComponent } from '../reports-page/reports-page';
import { SettingsPageComponent } from '../settings-page/settings-page';

@Component({
  selector: 'app-sub-module-page',
  imports: [
    MenuItemComponent,
    ContractsPageComponent,
    RepositoryPageComponent,
    ConfigurationPageComponent,
    LibraryPageComponent,
    ReportsPageComponent,
    SettingsPageComponent,
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
