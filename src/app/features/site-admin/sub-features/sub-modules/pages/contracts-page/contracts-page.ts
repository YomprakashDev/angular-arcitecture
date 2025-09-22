import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';
import { SubModule } from '../../models/sub-module.model';

@Component({
  selector: 'app-contracts-page',
  imports: [CommonModule, LucideAngularModule, MatIconModule],
  templateUrl: './contracts-page.html',
  styleUrl: './contracts-page.css'
})
export class ContractsPage {
  editIcon = SquarePen;
  dragIcon = GripVertical;

  editId = signal<number | null>(null)

  subModules = input.required<SubModule[]>()

  toggleChildren(item: any) {
    item.expanded = !item.expanded;
  }

  startEdit(item: SubModule) {
    this.editId.set(item.subModuleId);
  }

}
