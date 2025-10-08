import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { MenuItemComponent } from "../../../../../../shared/components/ui/menu-item/menu-item";
import { SubModulesService } from '../../../sub-modules/services/sub-modules.service';
import { Modules, SubModule } from '../../../sub-modules/models/sub-module.model';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpdatePackageStatus } from "../update-package-status/update-package-status";
import { PackageRequest, SelectedPkgModule } from '../../models/package.model';
import { Button } from "../../../../../../shared/components/ui/button/button";
type ModuleMin = { id: number; name: string; };

@Component({
  selector: 'app-add-view-packages',
  imports: [FormsModule, LucideAngularModule, MenuItemComponent, UpdatePackageStatus, Button],
  templateUrl: './add-view-packages.html',
  styleUrl: './add-view-packages.css'
})
export class AddViewPackages {

  private subModuleService = inject(SubModulesService);
  
  // All modules from API
  items = signal<Modules | null>(null);

  // form pieces (signals)
  packageName = signal('Silver');
  packageCode = signal('SILV');
  createdBy = signal(1);
  pkgStatus = signal(1);

  // final payload we will POST
  payload = signal<PackageRequest>({
    packageId: 0,
    packageName: '',
    packageCode: '',
    createdby: 0,
    status: 1,
    selectedPkgModule: [],
  });

  icons = AppIcons;
  constructor() {
    this.loadSubModules();

  }

  selectedItem = signal<number | null>(null);

  // Submodules of the selected module 
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

  // Child tells us which submodules are checked for THIS module
  upsertModuleSelection(updated: SelectedPkgModule) {
    const p = this.payload();
    const idx = p.selectedPkgModule.findIndex(m => m.moduleID === updated.moduleID);
    if (idx > -1) p.selectedPkgModule[idx] = updated;
    else p.selectedPkgModule.push(updated);
    this.payload.set({ ...p });
  }

  save(){
       console.log('FINAL PAYLOAD', this.payload);
  }
}
