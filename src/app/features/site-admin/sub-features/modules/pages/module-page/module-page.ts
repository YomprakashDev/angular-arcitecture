import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';

import { ModuleService } from '../../services/module.service';
import { Module } from '../../model/module.model';

import { EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingSpinner } from "../../../../../../shared/components/ui/loading-spinner/loading-spinner";
import { ErrorBanner } from "../../../../../../shared/components/ui/error-banner/error-banner";
import { ToggleSwitch } from "../../../../../../shared/components/ui/toggle-switch/toggle-switch";
import { Card } from "../../../../../../shared/components/ui/card/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";

/** Minimal, Tailwind-first Modules page */
@Component({
  selector: 'app-module-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    LucideAngularModule,
    LoadingSpinner,
    ErrorBanner,
    ToggleSwitch,
    Card,
    MatPaginatorModule
  ],
  templateUrl: './module-page.html',
  styleUrls: ['./module-page.css'],
})
export class ModulePage  {
  /** Table columns */
  displayedColumns = ['actions', 'status', 'moduleName', 'description', 'icon'];

  /** Icons */
  readonly editIcon = SquarePen;
  readonly dragIcon = GripVertical;

  /** UI state */
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  /** Inline edit state */
  editingModuleId = signal<number | null>(null);
  editedModuleName = signal('');
  editedModuleDescription = signal('');
  isDirty = signal(false);

  /** Table DS */
  dataSource = new MatTableDataSource<Module>([]);

  private moduleService = inject(ModuleService);

  constructor() {
    this.loadModules();
  }

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
   


  /** Load data with friendly error handling. */
  loadModules(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.moduleService
      .getModules(1, 10)
      .pipe(
        takeUntilDestroyed(),
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          console.error('[ModulePage] load error:', err);
          this.error.set('Failed to load modules. Please try again.');
          this.dataSource.data = [];
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.dataSource.data = res.data ?? [];
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;

      }
        
      }
      );
  }

  /** Track rows by stable id (perf). */
  trackById = (_: number, row: Module) => row.id;

  /** Enter edit mode for a row. */
  editModule(module: Module) {
    this.editingModuleId.set(module.id);
    this.editedModuleName.set(module.moduleName);
    this.editedModuleDescription.set(module.description);
    this.isDirty.set(false);
  }

  /** Mark inline fields dirty. */
  onFieldChange() {
    this.isDirty.set(true);
  }

  /** Cancel edit mode. */
  cancelEditModule() {
    this.editingModuleId.set(null);
  }

  /** Persist edited row and refresh. */
  saveModule(module: Module) {
    const payload: Module = {
      ...module,
      moduleName: this.editedModuleName(),
      description: this.editedModuleDescription(),
    };

    this.moduleService
      .saveModule(payload)
      .subscribe({
        next: () => {
          this.loadModules();
          this.editingModuleId.set(null);
        },
        error: (err) => {
          console.error('[ModulePage] save error:', err);
        },
      });
  }

  /** Optimistic toggle with revert on error. */
  toggleModuleStatus(module: Module, next: boolean) {
    const prev = module.status;
    module.status = next;

    this.moduleService
      .updateStatus(module.id, next)
      .subscribe({
        error: (err) => {
          console.error('[ModulePage] status error:', err);
          module.status = prev;
        },
      });
  }
}
