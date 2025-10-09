import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { ModuleService } from './../services/module.service';
import { Module } from './../model/module.model';

import { LoadingSpinner } from './../../../../../shared/components/ui/loading-spinner/loading-spinner';
import { ErrorBanner } from './../../../../../shared/components/ui/error-banner/error-banner';
import { ToggleSwitch } from './../../../../../shared/components/ui/toggle-switch/toggle-switch';
import { Card } from './../../../../../shared/components/ui/card/card';
import { LucideAngularModule } from 'lucide-angular';
import { AppIcons } from './../../../../../../assets/icons/icons';
import { FormsModule } from '@angular/forms';
/** Modules page */
@Component({
  selector: 'app-module-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
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
export class ModulePage implements OnInit {
  /** Visible table columns (order matters). */
  readonly displayedColumns = ['actions', 'status', 'moduleName', 'description', 'icon'] as const;

  /** Page UI state. */
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  /** Inline edit state. */
  readonly editingModuleId = signal<number | null>(null);
  readonly editedModuleName = signal('');
  readonly editedModuleDescription = signal('');
  readonly isDirty = signal(false);

  /** Table data source (client-side paginate/sort/filter). */
  readonly dataSource = new MatTableDataSource<Module>([]);

  /** Icons used in the template. */
  readonly icons = AppIcons;

  // DI
  private readonly destroyRef = inject(DestroyRef);
  private readonly moduleService = inject(ModuleService);

  @ViewChild(MatPaginator)
  set matPaginator(p: MatPaginator | undefined) {
    if (p) {
      this.paginator = p;
      this.dataSource.paginator = p;

    }
  }
  private paginator!: MatPaginator;


  /** Initial data load. */
  ngOnInit(): void {
    this.loadModules();
  }

  /**
   * Fetch modules and populate the table.
   */
  loadModules(): void {

    this.isLoading.set(true);
    this.error.set(null);
    this.moduleService
      .getModules(1, 10)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          console.error('[ModulePage] load error:', err);
          this.error.set('Failed to load modules. Please try again.');
          this.dataSource.data = [];
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((res) => {
        this.dataSource.data = res.data ?? [];

      }
      );
  }

  /** Mark inline fields as dirty . */
  onFieldChange() {
    this.isDirty.set(true);
  }

  /** Exit inline edit mode and clear temporary values. */
  private resetEdit() {
    this.editingModuleId.set(null);
    this.editedModuleName.set('');
    this.editedModuleDescription.set('');
    this.isDirty.set(false);
  }

  /** Enter edit mode for a row. */
  editModule(module: Module) {
    this.editingModuleId.set(module.id);
    this.editedModuleName.set(module.moduleName);
    this.editedModuleDescription.set(module.description);
    this.isDirty.set(false);
  }

  /** Cancel edit mode. */
  cancelEditModule() {
    this.editingModuleId.set(null);
  }

  /** Save Inline edited module name and description  */
  saveModule(row: Module) {
    const payload: Module = {
      ...row,
      moduleName: this.editedModuleName(),
      description: this.editedModuleDescription(),
    };

    this.moduleService
      .saveModule(payload)
      .subscribe({
        next: () => {

          this.dataSource.data = this.dataSource.data.map((m) =>
            m.id === row.id ? { ...m, ...payload } : m
          );
          this.resetEdit();
        },
        error: (err) => {
          console.error('[ModulePage] save error:', err);
        },
      });
  }

  /**  toggle to status update */
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
