import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubModulePage } from '../../../sub-modules/page/sub-module-page';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { MenuItemComponent } from "../../../../../../shared/components/ui/menu-item/menu-item";
import { SubModulesService } from '../../../sub-modules/services/sub-modules.service';
import { Modules, SubModule } from '../../../sub-modules/models/sub-module.model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpdatePackageStatus } from "../update-package-status/update-package-status";
type ModuleMin = { id: number; name: string };

@Component({
  selector: 'app-add-view-packages',
  imports: [FormsModule, LucideAngularModule, MenuItemComponent, UpdatePackageStatus],
  templateUrl: './add-view-packages.html',
  styleUrl: './add-view-packages.css'
})
export class AddViewPackages {
  packageName = signal('Silver');
  private subModuleService = inject(SubModulesService);
  // All modules from API
  items = signal<Modules | null>(null);
  icons = AppIcons;
  constructor() {
    this.loadSubModules();

  }

  selectedItem = signal<number | null>(null);
  // Submodules of the selected module (kept as a plain array to match your current template binding)
  selectedSubModules: SubModule[] = [];


  moduleNameList = computed<ModuleMin[]>(
    () => this.items()?.map(m => ({ id: m.moduleID, name: m.moduleName })) ?? []
  )

  private loadSubModules(): void {

    this.subModuleService.getSubModules()
      .pipe(catchError(() => {
        return EMPTY;
      }),
        takeUntilDestroyed()
      )
      .subscribe((res) => {
        this.items.set(res);
      });
  }

  selectItem(id: number): void {
    this.selectedItem.set(id);
    const modules = this.items()?.find(m => m.moduleID === id);
    this.selectedSubModules = modules?.subModules ?? [];
  }
}
