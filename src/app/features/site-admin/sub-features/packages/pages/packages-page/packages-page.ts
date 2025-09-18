import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { effect, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as XLSX from 'xlsx';

import { Button } from '../../../../../../shared/components/ui/button/button';

export interface ModuleItem {
  id: number;
  packageName: string;
  modules: string[];
  status: boolean;
  order: number;
}

@Component({
  selector: 'app-packages-page',
  imports: [CommonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,

  ],
  templateUrl: './packages-page.html',
  styleUrl: './packages-page.css'
})
export class PackagesPage {
  // Configuration for the table columns.
  displayedColumns: string[] = ['actions', 'status', 'packageName', 'modules'];

  // State for inline editing.
  editingModuleId = signal<number | null>(null);
  editedModuleName = signal('');
  editedModuleDescription = signal('');

  /**
   * The source of truth for the list of modules.
   */
  modules = signal<ModuleItem[]>([
    { id: 1, packageName: 'Silver', modules: ['Contracts', 'Repository', 'Library', 'Reports'], status: true, order: 1 },
    { id: 2, packageName: 'Gold', modules: ['Contracts', 'Repository', 'Library', 'Reports'], status: true, order: 2 },
    { id: 3, packageName: 'Platinum', modules: ['Contracts', 'Repository', 'Library', 'Reports'], status: true, order: 3 },
  ]);



}
