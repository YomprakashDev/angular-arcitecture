import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';
interface ContractItem {
  name: string;
  editable: boolean;
  enabled: boolean;
  children?: ContractItem[];
  expanded?: boolean;
}
@Component({
  selector: 'app-contracts-page',
  imports: [CommonModule, LucideAngularModule, MatIconModule],
  templateUrl: './contracts-page.html',
  styleUrl: './contracts-page.css'
})
export class ContractsPage {
  editIcon = SquarePen;
  dragIcon = GripVertical;
 items: ContractItem[] = [
    { name: 'New Contract', editable: true, enabled: true },
    { name: 'Template Library', editable: true, enabled: true },
    {
      name: 'Import Contract',
      editable: true,
      enabled: false,
      expanded: true,
      children: [
        { name: 'Single', editable: true, enabled: true },
        { name: 'Bulk Contract', editable: true, enabled: false },
      ],
    },
  ];

  
}
