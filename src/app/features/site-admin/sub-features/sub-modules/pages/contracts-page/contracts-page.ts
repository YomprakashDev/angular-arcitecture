import { CommonModule } from '@angular/common';
import { Component,inject, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { Child,  SubModule } from '../../models/sub-module.model';
import { SubModulesService } from '../../services/sub-modules.service';
import { FormsModule } from '@angular/forms';
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { ToggleSwitch } from "../../../../../../shared/components/ui/toggle-switch/toggle-switch";

@Component({
  standalone: true,
  selector: 'app-contracts-page',
  imports: [CommonModule, LucideAngularModule, FormsModule, ToggleSwitch],
  templateUrl: './contracts-page.html',
  styleUrls: ['./contracts-page.css'],
})
export class ContractsPage {

  icons = AppIcons;

  editId = signal<number | null>(null)
  subModuleService = inject(SubModulesService);
  subModules = input.required<SubModule[]>()

  editedSubModule = signal<string>('');

  // NEW: keep expansion locally (don’t mutate input objects)
  private expandedIds = signal<Set<number>>(new Set());       

  // NEW: derive expansion state for an id
  isExpanded(id: number): boolean {                            
    return this.expandedIds().has(id);
  }

  toggleChildren(id : number) {
    const next = new Set(this.expandedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.expandedIds.set(next);
  }

  startEdit(item: SubModule) {
    this.editId.set(item.subModuleId);
    this.editedSubModule.set(item.subModuleName)
  }

  cancelEdit() {
    this.editId.set(null);
  }

  saveModule(item: SubModule) {

    this.subModuleService.saveSubModule(this.editedSubModule(), item.subModuleId).subscribe({
      next: () => {
        item.subModuleName = this.editedSubModule();
        this.editId.set(null);
      }
    })

  }

  updateStatusSubModule(item: SubModule, next: boolean) {
    const prev = item.subModuleStatus;
    item.subModuleStatus = next
    this.subModuleService.updateSubModuleStatus(item
      .subModuleId, next
    ).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error updating module status:', err)
        item.subModuleStatus = prev
      }
    })
  }

  updateStatusChild(child: Child, next: boolean) {
    const prev = child.subChildStatus;
    child.subChildStatus = next
    this.subModuleService.updateChildModuleStatus(child.childID, next).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error updating module status:', err)
        child.subChildStatus = prev
      }
    })
  }

  saveChildSubModuleName(child: Child) {
    // console.log(child);
  }

}
