import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, SquarePen, GripVertical } from 'lucide-angular';
import { MatIconModule } from '@angular/material/icon';

export interface ContractItem {
  name: string;
  editable: boolean;
  enabled: boolean;
  children?: ContractItem[];
  expanded?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-module-edit',
  imports: [CommonModule, LucideAngularModule, MatIconModule],
  templateUrl: './module-edit.html',
styleUrls: ['./module-edit.css']
})
export class ModuleEdit {
  @Input() items: ContractItem[] = [];

  // Events to notify parent
  @Output() edit = new EventEmitter<ContractItem>();
  @Output() toggleEnabled = new EventEmitter<ContractItem>();

  editIcon = SquarePen;
  dragIcon = GripVertical;

  toggleExpanded(item: ContractItem) {
    item.expanded = !item.expanded;
  }

  onEdit(item: ContractItem) {
    this.edit.emit(item);
  }

  onToggleEnabled(item: ContractItem) {
    item.enabled = !item.enabled;
    this.toggleEnabled.emit(item);
  }
}
