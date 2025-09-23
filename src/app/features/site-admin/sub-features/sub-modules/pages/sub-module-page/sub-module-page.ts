import { Component, computed, inject, signal } from '@angular/core';
import { MenuItemComponent } from '../../../../../../shared/components/ui/menu-item/menu-item';
import { ContractsPage } from '../contracts-page/contracts-page';
import { SubModulesService } from '../../services/sub-modules.service';
import { Module, Modules, SubModule } from '../../models/sub-module.model';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
type ModuleMin = { id: number; name: string };

@Component({
  selector: 'app-sub-module-page',
  standalone: true,
  imports: [MenuItemComponent, ContractsPage,MatProgressSpinnerModule],
  templateUrl: './sub-module-page.html',
  styleUrls: ['./sub-module-page.css']
})
export class SubModulePage {
  private subModuleService = inject(SubModulesService);

  // All modules from API
  items = signal<Modules | null>(null);

  isLoading = signal<boolean>(true);

  // Selected module id
  selectedItem = signal<number>(0);

  // Submodules of the selected module (kept as a plain array to match your current template binding)
  selectedSubModules: SubModule[] = [];

  // [{ id, name }] projection for menus, etc.
  moduleNameList = computed<ModuleMin[]>(
    () => this.items()?.map(m => ({ id: m.moduleID, name: m.moduleName })) ?? []
  );

  // The currently selected full Module object
  selectedModule = computed<Module | null>(() => {
    const mods = this.items();
    const id = this.selectedItem();
    return mods?.find(m => m.moduleID === id) ?? null;
  });

  constructor() {
    this.CallingAPI();

  }

  private CallingAPI(): void {
    this.isLoading.set(true);
    this.subModuleService.getSubModules().pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res: Modules) => {
          this.items.set(res);

          this.selectItem(res[0].moduleID);
        },
        error: (err) => {
          console.error(err)
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
