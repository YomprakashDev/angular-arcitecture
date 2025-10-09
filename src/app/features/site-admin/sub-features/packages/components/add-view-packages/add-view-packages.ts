import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import { AppIcons } from '../../../../../../../assets/icons/icons';
import { MenuItemComponent } from '../../../../../../shared/components/ui/menu-item/menu-item';
import { Button } from '../../../../../../shared/components/ui/button/button';

import { SubModulesService } from '../../../sub-modules/services/sub-modules.service';
import { Modules, SubModule } from '../../../sub-modules/models/sub-module.model';

import { UpdatePackageStatus } from '../update-package-status/update-package-status';
import { PackageRequest, SelectedPkgModule } from '../../models/package.model';

import { catchError, EMPTY } from 'rxjs';
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
export class AddViewPackages implements OnInit {

  // Services
  private readonly subModuleService = inject(SubModulesService);
  private readonly pkgService = inject(PackageService);
  private readonly destroyRef = inject(DestroyRef);
  // Icons
  readonly icons = AppIcons;

  // API data
  readonly modules = signal<Modules>([]);

  // Form state (signals)
  readonly packageName = signal<string>('Silver');
  readonly packageCode = signal<string>('Sil');
  readonly createdBy = signal<number>(1);
  readonly pkgStatus = signal<number>(1);

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

  // Compute submodules for the selected module reactively
  readonly selectedSubModules = computed<SubModule[]>(() => {
  const id = this.selectedModuleId();
    if (id == null) return [];
    const found = this.modules().find(m => m.moduleID === id);
    return found?.subModules ?? [];
  });


  // Final payload (UI → API DTO)
  readonly payload = computed<PackageRequest>(() => ({
    // For "add" flows, avoid hard-coding 1. Use 0/undefined per API contract.
    packageId: 0,
    packageName: this.packageName(),
    packageCode: this.packageCode(),
    createdby: this.createdBy(), // keep casing only if your API requires 'createdby'
    status: this.pkgStatus(),
    selectedPkgModule: this.moduleSelections()
  }));

  // // Save button enablement
  // readonly canSave = computed<boolean>(() => {
  //   const name = this.packageName().trim();
  //   const code = this.packageCode().trim();
  //   return !!name && !!code && this.moduleSelections().length > 0;
  // });


  ngOnInit(): void {
    this.loadSubModules();
  }

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
          // if current selection became disabled after refresh, fix it
          const stillEnabled = enabled.some(m => m.moduleID === this.selectedModuleId());
          if (!stillEnabled) this.selectedModuleId.set(enabled[0]?.moduleID ?? null);
        }
      });
  }


  selectItem(id: number): void {
    this.selectedModuleId.set(id);

  }

  upsertModuleSelection(updated: SelectedPkgModule): void {
    const arr = [...this.moduleSelections()];
    const i = arr.findIndex(m => m.moduleID === updated.moduleID);
    if (i > -1) arr[i] = updated; else arr.push(updated);
    this.moduleSelections.set(arr);
  }

  save(): void {

    const request = this.payload();
    this.pkgService.addNewPackage(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('[AddViewPackages] saved', res);
          // TODO: emit close/success if parent should react
        },
        error: (err) => {
          console.error('[AddViewPackages] save error', err);
        }
      });
  }
}
