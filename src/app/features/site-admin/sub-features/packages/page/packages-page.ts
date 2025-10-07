import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PackageService } from './../services/package.service';
import { catchError, EMPTY, finalize, } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PackagesResponse } from './../models/package.model';
import { LucideAngularModule, } from 'lucide-angular';
import { AddViewPackages } from "./../components/add-view-packages/add-view-packages";
import { AppIcons } from './../../../../../../assets/icons/icons';
import { Card } from "./../../../../../shared/components/ui/card/card";
import { LoadingSpinner } from "../../../../../shared/components/ui/loading-spinner/loading-spinner";


export interface PackageRow {
  packageID: number;
  packageName: string;
  modules: string[];
  status: boolean;
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
    MatProgressSpinnerModule, AddViewPackages, Card, LoadingSpinner],
  templateUrl: './packages-page.html',
  styleUrls: ['./packages-page.css']
})
export class PackagesPage {
  // Configuration for the table columns.
  displayedColumns: string[] = ['actions', 'status', 'packageName', 'modules'];
  // source-of-truth (matches your org approach)
  packages = signal<PackagesResponse>([]);
  // State for inline editing.
  editingModuleId = signal<number | null>(null);
  editedModuleName = signal('');
  editedModuleDescription = signal('');

  /**
   * The source of truth for the list of modules.
   */

  icons = AppIcons;
  isAddView = signal(false)


  toggleAddView() {
    this.isAddView.set(true)
  }
  private packageService = inject(PackageService);

  // loading signal
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);


  // material data source
  dataSource = new MatTableDataSource<PackageRow>([]);

  constructor() {
    this.loadPackages();
  }
  // Keep packages in a signal
  loadPackages(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.packageService.getPackages()
      .pipe(
        catchError(err => {
          console.error('[PackagesPage] API error:', err);
          this.error.set('Failed to load packages.');
          this.dataSource.data = [];
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed()
      )
      .subscribe(resp => {
        // keep the raw API in a signal (like your org page)
        this.packages.set(resp);

        // map to rows for the table
        const rows: PackageRow[] = resp.map(pkg => ({
          packageID: pkg.packageID,
          packageName: pkg.packageName,
          modules: (pkg.modules ?? []).map(m => m.moduleName),
          status: (pkg.modules ?? []).some(m => m.moduleStatus),
        }));

        this.dataSource = new MatTableDataSource(rows);

      });
  }



}
