import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

interface TagRow {
  tagType: string;
  contractsTagged: number;
  status: string;
}
@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [CommonModule, MatTableModule],
  templateUrl: './tags.html',
  styleUrls: ['./tags.css'],
})
export class Tags {
  displayedColumns = ['actions', 'status', 'tagType', 'contractsTagged'];

  rows: TagRow[] = [
    { tagType: 'Finance', contractsTagged: 12, status: 'off' },
    { tagType: 'Legal', contractsTagged: 8, status: 'on' },
    { tagType: 'Vendor', contractsTagged: 6, status: 'off' },
    { tagType: 'Finance', contractsTagged: 2, status: 'on' },
  ];
}
