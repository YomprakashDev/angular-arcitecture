import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';
import { SubModule, SubModuleResponse } from '../../models/sub-module.model';
import { SubModulesService } from '../../services/sub-modules.service';

@Component({
  selector: 'app-contracts-page',
  imports: [CommonModule, LucideAngularModule, MatIconModule],
  templateUrl: './contracts-page.html',
  styleUrl: './contracts-page.css'
})
export class ContractsPage {
  editIcon = SquarePen;
  dragIcon = GripVertical;

  subModuleService = inject(SubModulesService);

  items = signal<SubModule[] | null>(null);

  constructor() {
    this.subModuleService.getSubModules(1, 1, 10).subscribe(
      (res: SubModuleResponse) => {
        this.items.set(res.data);
      }
    )
  }

 toggleChildren(item: SubModule) {
  item.expanded = !item.expanded;
}


}
