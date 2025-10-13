import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import { AppIcons } from '../../../../../../../assets/icons/icons';
import { MenuItemComponent } from '../../../../../../shared/components/ui/menu-item/menu-item';
import { Button } from '../../../../../../shared/components/ui/button/button';

import { SubModulesService } from '../../../sub-modules/services/sub-modules.service';
import { Modules, SubModule } from '../../../sub-modules/models/sub-module.model';

import { UpdatePackageStatus } from '../update-package-status/update-package-status';
import { PackageItem, PackageRequest, PackagesResponse, SelectedPkgModule } from '../../models/package.model';

import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PackageService } from '../../services/package.service';

// UI projection for menu list items
type ModuleMenuItem = Readonly<{ id: number; name: string; }>;

@Component({
  selector: 'app-add-view-packages',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, MenuItemComponent, UpdatePackageStatus, Button],
  templateUrl: './add-view-packages.html',
  styleUrls: ['./add-view-packages.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddViewPackages {

  // Services
  private readonly subModuleService = inject(SubModulesService);
  private readonly pkgService = inject(PackageService);
  private readonly destroyRef = inject(DestroyRef);
  // Icons
  readonly icons = AppIcons;

  viewPkgId = input<number | null>(null);
  editPkgId = input<number | null>(null);
  close = output<void>();
  // API data
  readonly modules = signal<Modules>([]);

  // Form state (signals)
  readonly packageName = signal<string>('Silver');
  readonly packageCode = signal<string>('Sil');
  readonly createdBy = signal<number>(1);
  readonly pkgStatus = signal<number>(1);
  // UI state
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // Mode derived from presence of id
  readonly isViewMode = computed(() => this.viewPkgId() != null);
  readonly isEditMode = computed(() => this.editPkgId() !== null);
  readonly selectedModuleId = signal<number | null>(null);

  // Module selection state
  readonly selectedItem = signal<number | null>(null);
  readonly moduleSelections = signal<SelectedPkgModule[]>([]);

  readonly menuItems = computed<ModuleMenuItem[]>(() =>
    this.modules().filter(m => m.moduleStatus).map(m => ({
      id: m.moduleID,
      name: m.moduleName,
    }))
  );


  readonly selectedSubModules = computed<SubModule[]>(() => {
    const id = this.selectedModuleId();
    if (id == null) return [];
    const found = this.modules().find(m => m.moduleID === id);
    return found?.subModules ?? [];
  });


  // Final payload (UI → API DTO)
  readonly payload = computed<PackageRequest>(() => {

    const id = this.editPkgId();

    const packageId = id !== null && id > 0 ? id : 0;


    return {
      packageId: packageId,
      packageName: this.packageName(),
      packageCode: this.packageCode(),
      createdby: this.createdBy(),
      status: this.pkgStatus(),
      selectedPkgModule: this.moduleSelections()
    }
  });

  constructor() {

    effect(() => {
      this.error.set(null);
      this.isLoading.set(true);
      this.modules.set([]);
      this.selectedModuleId.set(null);
      this.moduleSelections.set([]);

      const id = this.viewPkgId();

      if (id != null) {
        // VIEW MODE: fetch one package by id
        this.pkgService.viewPackages(id)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            catchError(err => {
              console.error('[AddViewPackages] viewPackages error', err);
              this.error.set('Failed to load package.');
              return EMPTY;
            }),
            finalize(() => this.isLoading.set(false))
          )
          .subscribe((res) => {
            const pkg: PackageItem | undefined = Array.isArray(res) ? res[0] : (res as any);
            if (!pkg) { this.error.set('Package not found.'); return; }

            // Prefill read-only fields
            this.packageName.set(pkg.packageName ?? '');
            // backend returns boolean packageStatus; convert to 1/0
            this.pkgStatus.set(pkg.packageStatus ? 1 : 0);

            // Bind modules as-is from backend
            this.modules.set(pkg.modules ?? []);
            const first = pkg.modules?.find(m => m.moduleStatus) ?? pkg.modules?.[0];
            this.selectedModuleId.set(first?.moduleID ?? null);
          });
      } else {
        this.loadSubModules()
      }
    })

  }

  // ngOnInit(): void {
  //   this.loadSubModules();
  // }

  private loadSubModules(): void {
    this.subModuleService.getSubModules()
      .pipe(
        catchError(err => {
          console.error('[AddViewPackages] getSubModules error', err);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        const list = res ?? [];
        this.modules.set(list);

        const enabled = list.filter(m => m.moduleStatus);
        if (this.selectedModuleId() == null) {
          this.selectedModuleId.set(enabled[0]?.moduleID ?? null);
        } else {

          const stillEnabled = enabled.some(m => m.moduleID === this.selectedModuleId());
          if (!stillEnabled) this.selectedModuleId.set(enabled[0]?.moduleID ?? null);
        }
      });
  }


  selectItem(id: number | string): void {
    this.selectedModuleId.set(Number(id));
  }

  upsertModuleSelection(updated: SelectedPkgModule): void {
    const arr = [...this.moduleSelections()];
    const i = arr.findIndex(m => m.moduleID === updated.moduleID);
    if (i > -1) arr[i] = updated; else arr.push(updated);
    this.moduleSelections.set(arr);
  }

  onBack() {
    this.close.emit();
  }

  save(): void {
    if (this.isViewMode()) return;
    const request = this.payload();
    this.pkgService.addNewPackage(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.close.emit();
          console.log('[AddViewPackages] saved', res);

        },
        error: (err) => {
          console.error('[AddViewPackages] save error', err);
        }
      });
  }
}
