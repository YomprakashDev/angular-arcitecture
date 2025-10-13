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

  toggle(id: number | string, checked: boolean) {
    const nid = Number(id);                                  // CHANGED
    const set = new Set(this.selected());
    if (checked) set.add(nid); else set.delete(nid);         // CHANGED
    this.selected.set(set);
    this.emitSelection();
  }

  isChildChecked(subId: number | string, childId: number | string) {
    const sid = Number(subId);                               // CHANGED
    const cid = Number(childId);                             // CHANGED
    return this.childSelected().get(sid)?.has(cid) ?? false; // CHANGED
  }

  toggleChild(subId: number | string, childId: number | string, checked: boolean) {
    const sid = Number(subId);                               // CHANGED
    const cid = Number(childId);                             // CHANGED

    const map = new Map(this.childSelected());
    const set = new Set(map.get(sid) ?? []);
    if (checked) set.add(cid); else set.delete(cid);
    if (set.size) map.set(sid, set); else map.delete(sid);
    this.childSelected.set(map);

    this.emitSelection();
  }


private emitSelection() {
  const subSet = this.selected();
  const childMap = this.childSelected();

  const selectedPkgSub: SelectedPkgSub[] = this.subModules()
    .map(sm => {
      const sid = Number(sm.subModuleId);                  // CHANGED
      const subChecked = subSet.has(sid);                  // CHANGED
      const children = Array.from(childMap.get(sid) ?? []) // CHANGED
        .map<SelectedChild>(cid => ({ childId: cid, status: 1 }));

      if (!subChecked && children.length === 0) return null;

      return {
        subModuleId: sid,                                   // CHANGED
        status: subChecked ? 1 : 0,
        selectedChildren: children,
      } as SelectedPkgSub;
    })
    .filter(Boolean) as SelectedPkgSub[];

  const payload: SelectedPkgModule = {
    moduleID: Number(this.moduleId()),                      // CHANGED (be safe)
    status: 1,
    selectedPkgSub
  };

  this.selectionChange.emit(payload);
}



}
