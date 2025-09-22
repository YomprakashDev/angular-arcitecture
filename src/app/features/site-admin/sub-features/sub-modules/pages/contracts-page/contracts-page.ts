import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
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

  subModules = input.required<SubModule[]>()

  constructor() {
  
    effect(() => {
      console.log('SubModules input:', this.subModules());
    });
  }

  toggleChildren(item: any) {
    item.expanded = !item.expanded;
  }


}
