import { Component, computed, inject, signal } from '@angular/core';
import { MenuItemComponent } from '../../../../../../shared/components/ui/menu-item/menu-item';
import { ContractsPage } from '../contracts-page/contracts-page';
import { SubModulesService } from '../../services/sub-modules.service';
import { Module as ModuleNode, Modules, SubModule } from '../../models/sub-module.model';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
type ModuleMin = { id: number; name: string };

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

  // [{ id, name }] projection for menus, etc.
  moduleNameList = computed<ModuleMin[]>(
    () => this.items()?.map(m => ({ id: m.moduleID, name: m.moduleName })) ?? []
  );

  // The currently selected full Module object
  selectedModule = computed<ModuleNode | null>(() => {
    const mods = this.items();
    const id = this.selectedItem();
    return (id && mods) ? (mods.find(m => m.moduleID === id) ?? null) : null;
  });

  constructor() {
    this.loadSubModules();

  }

  private loadSubModules(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.subModuleService.getSubModules().pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res: Modules) => {
          this.items.set(res);
          if (res.length > 0) {
            const firstId = res[0].moduleID;
            this.selectItem(firstId);
          } else {
            this.selectedItem.set(null);
            this.selectedSubModules = [];
          }



        },
        error: (err) => {
          this.error.set('Failed to load modules. Please try again.');
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
