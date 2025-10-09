import { Component, computed, inject, signal } from '@angular/core';
import { MenuItemComponent } from '../../../../../shared/components/ui/menu-item/menu-item';
import { ContractsPage } from '../components/contracts-page/contracts-page';
import { SubModulesService } from '../services/sub-modules.service';
import { Module as ModuleNode, Modules, SubModule } from '../models/sub-module.model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from "../../../../../shared/components/ui/card/card";
type ModuleMin = { id: number; name: string, status: boolean };

@Component({
  selector: 'app-sub-module-page',
  standalone: true,
  imports: [MenuItemComponent, ContractsPage, MatProgressSpinnerModule],
  templateUrl: './sub-module-page.html',
  styleUrls: ['./sub-module-page.css']
})
export class SubModulePage {
  private subModuleService = inject(SubModulesService);

  // All modules from API
  items = signal<Modules | null>(null);

  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);


  // Selected module id
  selectedItem = signal<number | null>(null);

  // Submodules of the selected module (kept as a plain array to match your current template binding)
  selectedSubModules: SubModule[] = [];

  // [{ id, name }] projection for menus.
  moduleNameList = computed<ModuleMin[]>(
    () => this.items()?.map(m => ({ id: m.moduleID, name: m.moduleName, status: m.moduleStatus })) ?? []
  );

  // The currently selected full Module object
  selectedModule = computed<ModuleNode | null>(() => {
    const mods = this.items();
    const id = this.selectedItem();
    if (!mods || id == null) return null;
    return mods.find(m => m.moduleID === id) ?? null;
  });

  constructor() {
    this.loadSubModules();

  }

  private loadSubModules(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.subModuleService.getSubModules()
      .pipe(catchError((err) => {
        this.error.set(err.message);
        return EMPTY;
      }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed()
      )
      .subscribe((res) => {
        this.items.set(res);

        // choose a default: first with moduleStatus=true, otherwise first item
        const defaultId =
          res.find(m => m.moduleStatus)?.moduleID ?? res[0]?.moduleID;

        if (defaultId != null) {
          this.selectItem(defaultId); // also fills selectedSubModules
        }
      });
  }

  /** Updates selected id and caches its submodules */
  selectItem(id: number): void {
    this.selectedItem.set(id);
    const mod = this.items()?.find(m => m.moduleID === id);
    this.selectedSubModules = mod?.subModules ?? [];
  }
}
