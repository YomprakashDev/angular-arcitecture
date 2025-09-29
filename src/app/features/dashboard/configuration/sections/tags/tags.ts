import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Modal } from "../../../../../shared/components/ui/modal/modal";

interface TagRow {
  tagType: string;
  contractsTagged: number;
  status: string;
}
@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [CommonModule, MatTableModule, Modal],
  templateUrl: './tags.html',
  styleUrls: ['./tags.css'],
})
export class Tags {


  isAddingNewTag =  signal<boolean>(false);
  isEditingTag =  signal<boolean>(false);
  displayedColumns = ['actions', 'status', 'tagType', 'contractsTagged'];

  rows: TagRow[] = [
    { tagType: 'Finance', contractsTagged: 12, status: 'off' },
    { tagType: 'Legal', contractsTagged: 8, status: 'on' },
    { tagType: 'Vendor', contractsTagged: 6, status: 'off' },
    { tagType: 'Finance', contractsTagged: 2, status: 'on' },
  ];
}
