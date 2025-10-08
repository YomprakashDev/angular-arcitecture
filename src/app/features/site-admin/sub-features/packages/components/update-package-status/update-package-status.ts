import { Component, input, output, signal } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { SelectedPkgModule, SelectedPkgSub, SubModule } from '../../models/package.model';
import { CommonModule } from '@angular/common';
import { Button } from "../../../../../../shared/components/ui/button/button";

@Component({
  selector: 'app-update-package-status',
  imports: [LucideAngularModule, CommonModule, Button],
  templateUrl: './update-package-status.html',
  styleUrl: './update-package-status.css'
})
export class UpdatePackageStatus {
  icons = AppIcons;
  subModules = input.required<SubModule[]>();

  selectedPkgModule = signal([]);

  // keep the checked ids locally (simple set)
  selected = signal<Set<number>>(new Set());

  // tell parent whenever something changes
  selectionChange = output<SelectedPkgModule>();
  toggle(id: number, checked: boolean) {
    const set = new Set(this.selected());
    if (checked) set.add(id);
    else set.delete(id);
    this.selected.set(set);
    this.emitSelection();
  }

  private emitSelection() {
    const selectedPkgSub: SelectedPkgSub[] = Array.from(this.selected()).map(id => ({
      subModuleId: id,
      status: 1,
    }));

    const payload: SelectedPkgModule = {
      moduleID: this.moduleId(),
      status: 1,
      selectedPkgSub,
    };

    this.selectionChange.emit(payload);
  }

}
