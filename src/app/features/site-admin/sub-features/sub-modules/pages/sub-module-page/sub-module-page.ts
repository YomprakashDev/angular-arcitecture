import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sub-module-page',
  imports: [],
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
