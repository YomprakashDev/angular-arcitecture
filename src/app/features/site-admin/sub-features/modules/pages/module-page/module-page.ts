import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, ViewChild, } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { ModuleService } from '../../services/module.service';
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

    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,

    LucideAngularModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FormsModule,
    MatRadioModule,
    FormsModule
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

  refresh = signal(0);

  private refresh$ = toObservable(this.refresh);
  // Convert signals to observables and build pipeline:
  // whenever page or pageSize changes -> fetch modules, manage loading
  private page$ = toObservable(this.page);
  private pageSize$ = toObservable(this.pageSize);

  private modules$ = combineLatest([this.page$, this.pageSize$, this.refresh$]).pipe(
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
  editedModuleIcon = signal('');
  isDirty = signal(false); // track if user made changes

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


  /**
 * Enables edit mode for a specific module.
 * @param module The module to be edited.
 */
  editModule(module: Module) {

    this.editingModuleId.set(module.id);
    this.editedModuleName.set(module.moduleName);
    this.editedModuleDescription.set(module.description);
    this.editedModuleIcon.set(module.icon);
    this.isDirty.set(false); // reset when starting edit
  }

  onFieldChange() {
    this.isDirty.set(true);
  }


  cancelEditModule(module?: Module) {
    this.editingModuleId.set(null);

  }

  /**
   * Saves the changes for the currently edited module.
   * @param moduleId The ID of the module to save.
   */
  saveModule(module: Module) {
    const payLoad: Module = {
      ...module,
      id: module.id,
      moduleName: this.editedModuleName(),
      description: this.editedModuleDescription(),
      icon: this.editedModuleIcon()
    }
    this.moduleService.saveModule(payLoad).subscribe({
      next: () => {
        this.refresh.update(v => v + 1);
        this.editingModuleId.set(null);
      },
      error: (err) => {
        console.error('Error saving module:', err);
      }
    });


  }



  toggleModuleStatus(module: Module, next: boolean) {

    const prev = module.status;
    module.status = next
    this.moduleService.updatedStatus(module.id, next).subscribe({
      next: (res) => {
        console.log(res);

        console.log('Refreshing list...');
      },
      error: (err) => {
        console.error('Error updating module status:', err,
          module.status = prev
        );
      }
    })
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




}




