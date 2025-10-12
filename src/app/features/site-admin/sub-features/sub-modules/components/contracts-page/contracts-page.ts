import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { Child, SubModule } from '../../models/sub-module.model';
import { SubModulesService } from '../../services/sub-modules.service';
import { FormsModule } from '@angular/forms';
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { ToggleSwitch } from "../../../../../../shared/components/ui/toggle-switch/toggle-switch";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-contracts-page',
  imports: [CommonModule,
     LucideAngularModule,
      FormsModule,
      MatIconModule,
      MatButtonModule, 
      ToggleSwitch,MatTooltipModule],
  templateUrl: './contracts-page.html',
  styleUrls: ['./contracts-page.css'],
})
export class ContractsPage {

  icons = AppIcons;

  editId = signal<number | null>(null)
  childEditId = signal<number | null>(null)
  subModuleService = inject(SubModulesService);
  subModules = input.required<SubModule[]>()

  editedSubModule = signal<string>('');
  editedChildSubModule = signal<string>('')
  // NEW: keep expansion locally (don’t mutate input objects)
  private expandedIds = signal<Set<number>>(new Set());

  isExpanded(id: number): boolean {
    return this.expandedIds().has(id);
  }
  toggleChildren(id: number) {
    const next = new Set(this.expandedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.expandedIds.set(next);
  }
  startEdit(item: SubModule) {
    this.childEditId.set(null)
    this.editId.set(item.subModuleId);
    this.editedSubModule.set(item.subModuleName)
  }
  startEditChild(item: Child) {
    this.editId.set(null)
    this.childEditId.set(item.childID);
    this.editedChildSubModule.set(item.childName)
  }
  cancelEdit() {
    this.editId.set(null);
    this.childEditId.set(null);
  }
  saveModule(item: SubModule) {

    this.subModuleService.
      saveSubModuleName(this.editedSubModule(),
        item.subModuleId).subscribe({
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
    this.
      subModuleService.
      saveChildSubModuleName(this.editedChildSubModule(), child.childID).subscribe({
        next:() => {
          child.childName = this.editedChildSubModule()
          this.childEditId.set(null)
        }
      })
  }

}
