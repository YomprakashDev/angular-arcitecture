import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject, signal, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize } from 'rxjs';

import { LucideAngularModule } from 'lucide-angular';
import { AppIcons } from './../../../../../../assets/icons/icons';

import { PackageService } from './../services/package.service';
import { PackageRow, PackagesResponse } from './../models/package.model';

import { AddViewPackages } from "./../components/add-view-packages/add-view-packages";
import { Card } from "./../../../../../shared/components/ui/card/card";
import { LoadingSpinner } from "../../../../../shared/components/ui/loading-spinner/loading-spinner";
import { ToggleSwitch } from "../../../../../shared/components/ui/toggle-switch/toggle-switch";
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-packages-page',
  standalone: true,
  imports: [
    CommonModule,
    // Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatTooltipModule,
    // 3P
    LucideAngularModule,
    // App UI
    AddViewPackages,
    Card,
    LoadingSpinner,
    ToggleSwitch
  ],
  templateUrl: './packages-page.html',
  styleUrls: ['./packages-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesPage implements OnInit {
  // Columns
  readonly displayedColumns = ['actions', 'status', 'packageName', 'modules'] as const;

  // Raw API cache (if this is actually an array, consider renaming PackagesResponse -> PackageDto[])
  readonly packages = signal<PackagesResponse>([]);

  // UI state
  readonly isAddView = signal(false);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // Icons
  readonly icons = AppIcons;

  // DataSource
  readonly dataSource = new MatTableDataSource<PackageRow>([]);

  // Services
  private readonly packageService = inject(PackageService);
  private readonly destroyRef = inject(DestroyRef);

  // Paginator + Sort wiring
  @ViewChild(MatPaginator)
  set matPaginator(p: MatPaginator | undefined) {
    if (!p) return;
    if (this.dataSource.paginator !== p) this.dataSource.paginator = p;
  }



  ngOnInit(): void {
    this.loadPackages();
  }

  private mapToRows(dto: PackagesResponse): PackageRow[] {
    return dto.map(pkg => ({
      packageID: pkg.packageID,
      packageName: pkg.packageName,
      modules: (pkg.modules ?? []).map(m => m.moduleName),
      status: (pkg.modules ?? []).some(m => m.moduleStatus),
    }));
  }

  private loadPackages(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.packageService.getPackages()
      .pipe(
        catchError(err => {
          console.error('[PackagesPage] getPackages error', err);
          this.error.set('Failed to load packages.');
          this.dataSource.data = [];
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(resp => {
        this.packages.set(resp);
        this.dataSource.data = this.mapToRows(resp);
      });
  }

  // UI events
  openCreate(): void {
    this.isAddView.set(true);
  }
  closeCreate(): void {
    this.isAddView.set(false);
  }

  onToggelChange(row: PackageRow) {
    const next = !row.status;
    const prev = row.status;

    row.status = next;

    this.packageService.updatePackageStatus(row.packageID, next).subscribe({
      next: (Res) => {
        console.log(Res);
      },
      error: (e) => {
        console.log(e);
        row.status = prev;
      }
    })
  }

  onView(row: PackageRow): void {
    console.log('view', row.packageID);
  }

  onEdit(row: PackageRow): void {
    console.log('edit', row.packageID);
  }
}
