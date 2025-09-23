import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';
import { Child, Module, SubModule } from '../../models/sub-module.model';
import { SubModulesService } from '../../services/sub-modules.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contracts-page',
  imports: [CommonModule, LucideAngularModule, MatIconModule, FormsModule],
  templateUrl: './contracts-page.html',
  styleUrl: './contracts-page.css'
})
export class ContractsPage {
  editIcon = SquarePen;
  dragIcon = GripVertical;

  editId = signal<number | null>(null)
  subModuleService = inject(SubModulesService);
  subModules = input.required<SubModule[]>()

  editedSubModule = signal<string>('');

  toggleChildren(item: any) {
    item.expanded = !item.expanded;
  }

  startEdit(item: SubModule) {
    this.editId.set(item.subModuleId);
    this.editedSubModule.set(item.subModuleName)
  }

  cancleEdit() {
    this.editId.set(null);
  }

  saveModule(item: SubModule) {

    this.subModuleService.saveSubModule(this.editedSubModule(), item.subModuleId).subscribe({
      next: (res) => {
        console.log('Saved successfully', res);

        this.editId.set(null);
      }
    })

  }

  updateStatusSubModule(item: SubModule,next:boolean) {
    const prev = item.subModuleStatus;
    item.subModuleStatus = next
    this.subModuleService.updateSubModuleStatus(item
      .subModuleId, !item.subModuleStatus
    ).subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err) => {
        console.error('Error updating module status:', err)
          item.subModuleStatus = prev
      }
    })
  }

  updateStatusChild(child:Child, next: boolean) {
    const prev = child.subChildStatus;
    child.subChildStatus = next
    this.subModuleService.updateChildModuleStatus(child.childID,next).subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err) => {
        console.error('Error updating module status:', err)
          child.subChildStatus = prev
      }
    })
  }

  saveChildSubModuleName(child: Child) {
    // console.log(child);
  }

}
