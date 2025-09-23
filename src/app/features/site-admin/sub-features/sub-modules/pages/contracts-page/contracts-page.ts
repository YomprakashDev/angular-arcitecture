import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';
import { SubModule } from '../../models/sub-module.model';
import { SubModulesService } from '../../services/sub-modules.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contracts-page',
  imports: [CommonModule, LucideAngularModule, MatIconModule,FormsModule],
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
  }

  cancleEdit(){
    this.editId.set(null);
  }

  saveEdit(item:SubModule){
    this.subModuleService.saveSubModule(this.editedSubModule(),item.subModuleId).subscribe({
      next:(res)=>{
        console.log('Saved successfully', res);
        this.editId.set(null);
      }
    })
   
  }

}
