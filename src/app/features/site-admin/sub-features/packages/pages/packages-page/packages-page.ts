import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { effect, inject, signal, ViewChild } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Button } from '../../../../../../shared/components/ui/button/button';
import { PackageService } from '../../services/package.service';
import { catchError, combineLatest, finalize, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModuleItem, PackageItem,PackagesResponse } from '../../models/package.model';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
// Row model for the table (what you actually render)
export interface ModuleRow {
  id: number;                // packageID
  packageName: string;       // packageName
  modules: string[];         // list of module names
  status: boolean;           // derived: any module enabled?
  order: number;             // derive (e.g., index)
}

export interface PackageRow {
  packageID: number;
  packageName: string;
  modules: string[];
}


@Component({
  selector: 'app-packages-page',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    LucideAngularModule,
    MatProgressSpinnerModule

  ],
  templateUrl: './packages-page.html',
  styleUrls: ['./packages-page.css']
})
export class PackagesPage {
  // Configuration for the table columns.
  displayedColumns: string[] = ['actions', 'status', 'packageName', 'modules'];

  // State for inline editing.
  editingModuleId = signal<number | null>(null);
  editedModuleName = signal('');
  editedModuleDescription = signal('');

  /**
   * The source of truth for the list of modules.
   */
 readonly editIcon = SquarePen;
  readonly dragIcon = GripVertical;

  private packageService = inject(PackageService);

  // loading signal
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  private packages$ = this.packageService.getPackages().pipe(
    tap(() => {
      this.isLoading.set(true);
      this.error.set(null);
      console.log('[PackagesPage] calling API…');
    }),
    finalize(() => {
      this.isLoading.set(false);
      console.log('[PackagesPage] request finalized');
    }),
    catchError(err => {
      console.error('[PackagesPage] API error:', err);
      this.error.set('Failed to load packages');
      return of<PackagesResponse>([]);
    })
  );

  // material data source
  dataSource = new MatTableDataSource<PackageRow>([]);

  // Keep packages in a signal
  packages = toSignal(this.packages$, { initialValue: [] as PackagesResponse });
  constructor() {
    // When packages change, map to rows and feed the table
    effect(() => {
      const resp = this.packages(); // PackagesResponse ([])
      console.log(resp);
      this.dataSource.data = resp.map(pkg => ({
        packageName: pkg.packageName,
        packageID: pkg.packageID,
        modules: pkg.modules.map(m => m.moduleName),
      }));
    });
  }



}
