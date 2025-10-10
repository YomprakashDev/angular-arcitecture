import { Component, input, output, signal } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { SelectedChild, SelectedPkgModule, SelectedPkgSub, SubModule } from '../../models/package.model';
import { CommonModule } from '@angular/common';
import { Button } from "../../../../../../shared/components/ui/button/button";
type ChildMap = Map<number, Set<number>>;

@Component({
  standalone: true,
  selector: 'app-update-package-status',
  imports: [LucideAngularModule, CommonModule, Button],
  templateUrl: './update-package-status.html',
  styleUrls: ['./update-package-status.css']
})
export class UpdatePackageStatus {
  icons = AppIcons;
  subModules = input.required<SubModule[]>();

  moduleId = input.required<number>();

  // keep the checked ids locally (simple set)
  selected = signal<Set<number>>(new Set());
  // NEW: child selections grouped by subModule
  childSelected = signal<ChildMap>(new Map());

  // Parent event
  selectionChange = output<SelectedPkgModule>();

toggle(id: number, checked: boolean) {
    const set = new Set(this.selected());
    if (checked) set.add(Number(id));
     else set.delete(Number(id));
    this.selected.set(set);
    this.emitSelection();
  }

  //  // ----- CHILD HELPERS (NEW) -----
  // isChildChecked(subId: number, childId: number) {
  //   return this.childSelected().get(subId)?.has(childId) ?? false;
  // }

  //  toggleChild(subId: number, childId: number, checked: boolean) {
  //   const map = new Map(this.childSelected());
  //   const set = new Set(map.get(subId) ?? []);
  //   if (checked) set.add(childId); else set.delete(childId);
  //   if (set.size) map.set(subId, set); else map.delete(subId);
  //   this.childSelected.set(map);
  //   this.emitSelection();
  // }


  private emitSelection() {
    const subSet = this.selected();
    const childMap = this.childSelected();

    const selectedPkgSub: SelectedPkgSub[] = this.subModules()
      .map(sm => {
        const subChecked = subSet.has(sm.subModuleId);
        const children = Array.from(childMap.get(sm.subModuleId) ?? [])
          .map<SelectedChild>(cid => ({ childId: cid, status: 1 }));

        // If nothing selected (neither submodule nor children), skip it
        if (!subChecked && children.length === 0) return null;

        return {
          subModuleId: sm.subModuleId,
          status: subChecked ? 1 : 0
          // selectedChildren: children
        } as SelectedPkgSub;
      })
      .filter(Boolean) as SelectedPkgSub[];

    const payload: SelectedPkgModule = {
      moduleID: this.moduleId(),
      status: 1,
      selectedPkgSub
    };

    this.selectionChange.emit(payload);
  }


}
