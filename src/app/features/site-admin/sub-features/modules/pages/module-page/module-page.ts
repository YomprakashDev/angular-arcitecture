import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
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
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

import { ModuleService } from '../../services/module-service';
import { ModuleResponse, Module } from '../../model/module.model';
import { combineLatest } from 'rxjs';
import { tap, switchMap, finalize } from 'rxjs/operators';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

/**
 * Represents a single configurable module within the application.
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
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    LucideAngularModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FormsModule,
    MatRadioModule,

  ],
  templateUrl: './module-page.html',
  styleUrls: ['./module-page.css'],
})
export class ModulePage {
// columns
  displayedColumns = ['actions', 'status', 'moduleName', 'description', 'icon'];

  readonly editIcon = SquarePen;
  readonly dragIcon = GripVertical;

  private moduleService = inject(ModuleService);

  // paging signals
  page = signal<number>(1);
  pageSize = signal<number>(10);

  // loading signal
  isLoading = signal<boolean>(true);

  // Convert signals to observables and build pipeline:
  // whenever page or pageSize changes -> fetch modules, manage loading
  private page$ = toObservable(this.page);
  private pageSize$ = toObservable(this.pageSize);

  private modules$ = combineLatest([this.page$, this.pageSize$]).pipe(
    tap(() => this.isLoading.set(true)),
    switchMap(([p, ps]) =>
      this.moduleService.getModules(p, ps).pipe(
        finalize(() => this.isLoading.set(false))
      )
    )
  );

  // expose data as a signal for template usage
  module = toSignal<ModuleResponse | null>(this.modules$, { initialValue: null });

  // material data source
  dataSource = new MatTableDataSource<Module>([]);

  // inline edit signals
  editingModuleId = signal<number | null>(null);
  editedModuleName = signal('');
  editedModuleDescription = signal('');

constructor() {
    // keep table data in sync with module signal
    effect(() => {
      const resp = this.module();
      this.dataSource.data = resp?.data ?? [];
    });

    // trigger initial load (page/pageSize have initial values)
    // by resetting same values we ensure toObservable emits to start pipeline
    this.page.set(this.page());
    this.pageSize.set(this.pageSize());
  }

  // called by paginator (or anywhere) to change page
  loadPage(page: number, pageSize: number) {
    this.page.set(page);
    this.pageSize.set(pageSize);
  }

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
   * Handles the drop event from the CDK drag-and-drop list.
   * Reorders the modules both in the UI and updates their `order` property.
   */
  // drop(event: CdkDragDrop<ModuleItem[]>) {
  //   const updatedModules = [...this.modules()];
  //   moveItemInArray(updatedModules, event.previousIndex, event.currentIndex);
  //   this.modules.set(updatedModules.map((module, index) => ({ ...module, order: index + 1 })));
  // }

  /**
   * Announces sort changes for screen readers.
   */
  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  /**
   * Exports the current module configuration to an Excel file.
   */
  // exportToExcel() {
  //   const dataToExport = this.modules().map(({ moduleName, description, status, icon, order }) => ({
  //     'Module Name': moduleName,
  //     'Description': description,
  //     'Status': status ? 'Active' : 'Inactive',
  //     'Icon': icon,
  //     'Order': order,
  //   }));

  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Modules');
  //   ws['!cols'] = [{ wch: 20 }, { wch: 40 }, { wch: 10 }, { wch: 15 }, { wch: 8 }];
  //   const dateStr = new Date().toISOString().split('T')[0];
  //   XLSX.writeFile(wb, `module-configuration-${dateStr}.xlsx`);
  // }

  /**
   * Enables edit mode for a specific module.
   * @param module The module to be edited.
   */
  // editModule(module: ModuleItem) {
  //   this.editingModuleId.set(module.id);
  //   this.editedModuleName.set(module.moduleName);
  //   this.editedModuleDescription.set(module.description);
  // }

  /**
   * Saves the changes for the currently edited module.
   * @param moduleId The ID of the module to save.
   */
  // saveModule(moduleId: number) {
  //   this.modules.update(currentModules =>
  //     currentModules.map(m =>
  //       m.id === moduleId
  //         ? { ...m, moduleName: this.editedModuleName(), description: this.editedModuleDescription() }
  //         : m
  //     )
  //   );
  //   this.editingModuleId.set(null); // Exit edit mode
  // }

  /**
   * Cancels the current edit operation and discards changes.
   */
  // cancelEdit() {
  //   this.editingModuleId.set(null);
  // }

  /**
   * Toggles the `status` of a given module.
   * @param module The module whose status will be toggled.
   */
  // toggleStatus(module: ModuleItem) {
  //   this.modules.update(currentModules =>
  //     currentModules.map(m => (m.id === module.id ? { ...m, status: !m.status } : m))
  //   );
  // }
}




