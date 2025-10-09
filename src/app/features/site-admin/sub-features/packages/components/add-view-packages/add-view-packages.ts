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

type ModuleMin = { id: number; name: string };

@Component({
  selector: 'app-add-view-packages',
  imports: [FormsModule, LucideAngularModule, MenuItemComponent, UpdatePackageStatus, Button],
  templateUrl: './add-view-packages.html',
  styleUrls: ['./add-view-packages.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddViewPackages implements OnInit {

  // Services
  private readonly subModuleService = inject(SubModulesService);
  private readonly pkgService = inject(PackageService);
  private readonly destoryRef = inject(DestroyRef);
  // Icons
  readonly icons = AppIcons;

  // API data
  readonly items = signal<Modules>([]);

  // Form state (signals)
  readonly packageName = signal<string>('Silver');
  readonly packageCode = signal<string>('Sil');
  readonly createdBy = signal<number>(1);
  readonly pkgStatus = signal<number>(1);


  // Module selection state
  readonly selectedItem = signal<number | null>(null);
  readonly moduleSelections = signal<SelectedPkgModule[]>([]);

  // Derived lists
  readonly moduleNameList = computed<ModuleMin[]>(
    () => this.items().map(m => ({ id: m.moduleID, name: m.moduleName }))
  );

  // Compute submodules for the selected module reactively
  readonly selectedSubModules = computed<SubModule[]>(() => {
    const id = this.selectedItem();
    if (id == null) return [];
    const found = this.items().find(m => m.moduleID === id);
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

  // Save button enablement
  readonly canSave = computed<boolean>(() => {
    const name = this.packageName().trim();
    const code = this.packageCode().trim();
    return !!name && !!code && this.moduleSelections().length > 0;
  });


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
        takeUntilDestroyed(this.destoryRef)
      )
      .subscribe(res => this.items.set(res ?? []));
  }


  selectItem(id: number): void {
    this.selectedItem.set(id);
    // selectedSubModules is computed—no imperative assignment needed
  }

  upsertModuleSelection(updated: SelectedPkgModule): void {
    const arr = [...this.moduleSelections()];
    const i = arr.findIndex(m => m.moduleID === updated.moduleID);
    if (i > -1) arr[i] = updated; else arr.push(updated);
    this.moduleSelections.set(arr);
  }

  save(): void {
    if (!this.canSave()) return;

    const request = this.payload();
    this.pkgService.addNewPackage(request)
      .pipe(takeUntilDestroyed())
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
