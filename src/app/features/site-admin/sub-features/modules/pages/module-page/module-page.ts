import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as XLSX from 'xlsx';

import { Button } from '../../../../../../shared/components/ui/button/button';

/**
 * Represents a single configurable module within the application.
 */
export interface ModuleItem {
  id: number;
  moduleName: string;
  description: string;
  status: boolean;
  icon: string;
  order: number;
}

/**
 * A page for managing and configuring application modules.
 * Features include drag-and-drop reordering, inline editing, status toggling,
 * sorting, pagination, and exporting to Excel.
 */
@Component({
  selector: 'app-module-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    Button,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
  ],
  templateUrl: './module-page.html',
  styleUrls: ['./module-page.css'],
})
export class ModulePage {
  // Configuration for the table columns.
  displayedColumns: string[] = ['actions', 'status', 'moduleName', 'description', 'icon'];
  
  private _liveAnnouncer = inject(LiveAnnouncer);

  // State for inline editing.
  editingModuleId = signal<number | null>(null);
  editedModuleName = signal('');
  editedModuleDescription = signal('');

  /**
   * The source of truth for the list of modules.
   */
  modules = signal<ModuleItem[]>([
    { id: 1, moduleName: 'Contracts', description: 'Contracts description goes here', status: true, icon: 'insert_drive_file', order: 1 },
    { id: 2, moduleName: 'Repository', description: 'Repository description goes here', status: true, icon: 'folder', order: 2 },
    { id: 3, moduleName: 'Configuration', description: 'Configuration description goes here', status: true, icon: 'settings', order: 3 },
    { id: 4, moduleName: 'Library', description: 'Library description goes here', status: true, icon: 'library_books', order: 4 },
    { id: 5, moduleName: 'Reports', description: 'Reports description goes here', status: true, icon: 'assessment', order: 5 },
    { id: 6, moduleName: 'Settings', description: 'Settings description goes here', status: true, icon: 'tune', order: 6 },
    { id: 7, moduleName: 'Dashboard', description: 'Dashboard description goes here', status: true, icon: 'dashboard', order: 7 },
    { id: 8, moduleName: 'Users', description: 'Users description goes here', status: true, icon: 'people', order: 8 },
    { id: 9, moduleName: 'Notifications', description: 'Notifications description goes here', status: true, icon: 'notifications', order: 9 },
    { id: 10, moduleName: 'Analytics', description: 'Analytics description goes here', status: true, icon: 'insights', order: 10 },
  ]);

  /**
   * The data source for the Material table, which handles sorting and pagination.
   */
  dataSource = new MatTableDataSource<ModuleItem>();

  // Connects the MatSort directive to the table's data source.
  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  // Connects the MatPaginator directive to the table's data source.
  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  /**
   * An effect that automatically syncs the `modules` signal with the `dataSource`.
   * This ensures the table updates whenever the module list changes.
   */
  private syncEffect = effect(() => {
    this.dataSource.data = this.modules();
  });

  /**
   * Handles the drop event from the CDK drag-and-drop list.
   * Reorders the modules both in the UI and updates their `order` property.
   */
  drop(event: CdkDragDrop<ModuleItem[]>) {
    const updatedModules = [...this.modules()];
    moveItemInArray(updatedModules, event.previousIndex, event.currentIndex);
    this.modules.set(updatedModules.map((module, index) => ({ ...module, order: index + 1 })));
  }

  /**
   * Announces sort changes for screen readers.
   */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /**
   * Exports the current module configuration to an Excel file.
   */
  exportToExcel() {
    const dataToExport = this.modules().map(({ moduleName, description, status, icon, order }) => ({
      'Module Name': moduleName,
      'Description': description,
      'Status': status ? 'Active' : 'Inactive',
      'Icon': icon,
      'Order': order,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Modules');
    ws['!cols'] = [{ wch: 20 }, { wch: 40 }, { wch: 10 }, { wch: 15 }, { wch: 8 }];
    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `module-configuration-${dateStr}.xlsx`);
  }

  /**
   * Enables edit mode for a specific module.
   * @param module The module to be edited.
   */
  editModule(module: ModuleItem) {
    this.editingModuleId.set(module.id);
    this.editedModuleName.set(module.moduleName);
    this.editedModuleDescription.set(module.description);
  }

  /**
   * Saves the changes for the currently edited module.
   * @param moduleId The ID of the module to save.
   */
  saveModule(moduleId: number) {
    this.modules.update(currentModules =>
      currentModules.map(m =>
        m.id === moduleId
          ? { ...m, moduleName: this.editedModuleName(), description: this.editedModuleDescription() }
          : m
      )
    );
    this.editingModuleId.set(null); // Exit edit mode
  }

  /**
   * Cancels the current edit operation and discards changes.
   */
  cancelEdit() {
    this.editingModuleId.set(null);
  }

  /**
   * Toggles the `status` of a given module.
   * @param module The module whose status will be toggled.
   */
  toggleStatus(module: ModuleItem) {
    this.modules.update(currentModules =>
      currentModules.map(m => (m.id === module.id ? { ...m, status: !m.status } : m))
    );
  }
}
