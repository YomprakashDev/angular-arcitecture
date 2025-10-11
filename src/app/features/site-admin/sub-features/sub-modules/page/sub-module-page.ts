import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MenuItemComponent } from '../../../../../shared/components/ui/menu-item/menu-item';
import { ContractsPage } from '../components/contracts-page/contracts-page';
import { SubModulesService } from '../services/sub-modules.service';
import { Module as ModuleModel, Modules, SubModule } from '../models/sub-module.model';
import { LoadingSpinner } from "../../../../../shared/components/ui/loading-spinner/loading-spinner";

// UI projection for menu list items
type ModuleMenuItem = Readonly<{ id: number; name: string; }>;

@Component({
  selector: 'app-sub-module-page',
  standalone: true,
  imports: [MenuItemComponent,
    ContractsPage, LoadingSpinner],
  templateUrl: './sub-module-page.html',
  styleUrls: ['./sub-module-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubModulePage implements OnInit {
  // deps
  private readonly subModulesService = inject(SubModulesService);
  private readonly destroyRef = inject(DestroyRef);

  // remote state
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly modules = signal<Modules>([]);
  // selection state
  readonly selectedModuleId = signal<number | null>(null);

  // derived data
  readonly menuItems = computed<ModuleMenuItem[]>(() =>
    this.modules().filter(m => m.moduleStatus).map(m => ({
      id: m.moduleID,
      name: m.moduleName,
    }))
  );

  readonly selectedModule = computed<ModuleModel | null>(() => {
    const id = this.selectedModuleId();
    if (id == null) return null; // allow id=0
    return this.modules().find(m => m.moduleID === id) ?? null;
  });

  readonly selectedSubmodules = computed<SubModule[]>(
    () => this.selectedModule()?.subModules ?? []
  );

  // lifecycle: fetch data once component is ready
  ngOnInit(): void {
    this.fetchModules();
  }

  // data load + default selection 
  private fetchModules(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.subModulesService
      .getSubModules()
      .pipe(
        catchError(err => {
          this.error.set(err?.message ?? 'Failed to load modules.');
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
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

  // user action
  selectModule(id: number): void {
    this.selectedModuleId.set(id);
  }
}
