import { Component, effect, input, output, signal } from '@angular/core';
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
  viewOnly = input(false); // 👈 NEW
  editMode = input(false);
  // keep the checked ids locally (simple set)
  selected = signal<Set<number>>(new Set());
  // NEW: child selections grouped by subModule
  childSelected = signal<ChildMap>(new Map());

  // Parent event
  selectionChange = output<SelectedPkgModule>();

  toggle(id: number | string, checked: boolean) {
    const nid = Number(id);
    const set = new Set(this.selected());
    if (checked) set.add(nid); else set.delete(nid);
    this.selected.set(set);
    this.emitSelection();
  }

  constructor() {
  effect(() => {
    const sms = this.subModules();
    const sel = new Set<number>();
    const cmap = new Map<number, Set<number>>();
    sms.forEach(sm => {
      const sid = Number(sm.subModuleId);
      if (sm.subModuleStatus) sel.add(sid);
      const kids = (sm.children ?? [])
        .filter(c => c.subChildStatus)
        .map(c => Number(c.childID));
      if (kids.length) cmap.set(sid, new Set(kids));
    });
    this.selected.set(sel);
    this.childSelected.set(cmap);
  });
}

  isChildChecked(subId: number | string, childId: number | string) {
    const sid = Number(subId);
    const cid = Number(childId);
    return this.childSelected().get(sid)?.has(cid) ?? false;
  }

  toggleChild(subId: number | string, childId: number | string, checked: boolean) {
    const sid = Number(subId);
    const cid = Number(childId);

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
        const sid = Number(sm.subModuleId);
        const subChecked = subSet.has(sid);
        const children = Array.from(childMap.get(sid) ?? [])
          .map<SelectedChild>(cid => ({ childID: cid, status: 1 }));

        if (!subChecked && children.length === 0) return null;

        return {
          submmoduleIeid: sid,
          status: subChecked ? 1 : 0,
          selectedPkgChild: children,
        } as SelectedPkgSub;
      })
      .filter(Boolean) as SelectedPkgSub[];

    const payload: SelectedPkgModule = {
      moduleID: Number(this.moduleId()),
      status: 1,
      selectedPkgSub
    };

    this.selectionChange.emit(payload);
  }



}
