import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as XLSX from 'xlsx';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

// Define the module interface
export interface ModuleItem {
  id: number;
  moduleName: string;
  description: string;
  status: boolean;
  icon: string;
  order: number;
}

@Component({
  selector: 'app-module-page',
  standalone: true,
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
    FormsModule
  ],
  templateUrl: './module-page.html',
  styleUrls: ['./module-page.css']
})
export class ModulePage implements AfterViewInit {

  displayedColumns: string[] = ['actions', 'status', 'moduleName', 'description', 'icon'];

  private _liveAnnouncer = inject(LiveAnnouncer);

  isEditing = signal(false);

  modules = signal<ModuleItem[]>([
    {
      id: 1,
      moduleName: 'Contracts',
      description: 'Contracts description goes here',
      status: true,
      icon: 'insert_drive_file',
      order: 1
    },
    {
      id: 2,
      moduleName: 'Repository',
      description: 'Repository description goes here',
      status: true,
      icon: 'folder',
      order: 2
    },
    {
      id: 3,
      moduleName: 'Configuration',
      description: 'Configuration description goes here',
      status: true,
      icon: 'settings',
      order: 3
    },
    {
      id: 4,
      moduleName: 'Library',
      description: 'Library description goes here',
      status: true,
      icon: 'library_books',
      order: 4
    },
    {
      id: 5,
      moduleName: 'Reports',
      description: 'Reports description goes here',
      status: true,
      icon: 'assessment',
      order: 5
    },
    {
      id: 6,
      moduleName: 'Settings',
      description: 'Settings description goes here',
      status: true,
      icon: 'tune',
      order: 6
    },
    {
      id: 7,
      moduleName: 'Dashboard',
      description: 'Dashboard description goes here',
      status: true,
      icon: 'dashboard',
      order: 7
    },
    {
      id: 8,
      moduleName: 'Users',
      description: 'Users description goes here',
      status: true,
      icon: 'people',
      order: 8
    },
    {
      id: 9,
      moduleName: 'Notifications',
      description: 'Notifications description goes here',
      status: true,
      icon: 'notifications',
      order: 9
    },
    {
      id: 10,
      moduleName: 'Analytics',
      description: 'Analytics description goes here',
      status: true,
      icon: 'insights',
      order: 10
    }
  ]);

  dataSource = new MatTableDataSource(this.modules());
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  private syncEffect = effect(() => {
    this.dataSource.data = this.modules();
  });

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  get totalPages(): number {
    return Math.ceil(this.dataSource.data.length / this.paginator.pageSize);
  }

  exportToExcel() {
    // Get the current filtered and sorted data
    const dataToExport = this.dataSource.data.map(module => ({
      'Module Name': module.moduleName,
      'Description': module.description,
      'Status': module.status ? 'Active' : 'Inactive',
      'Icon': module.icon,
      'Order': module.order
    }));

    // Create workbook and worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Modules');

    // Set column widths for better formatting
    const colWidths = [
      { wch: 20 }, // Module Name
      { wch: 40 }, // Description
      { wch: 10 }, // Status
      { wch: 15 }, // Icon
      { wch: 8 }   // Order
    ];
    ws['!cols'] = colWidths;

    // Generate filename with current date
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    const filename = `module-configuration-${dateStr}.xlsx`;

    // Save the file
    XLSX.writeFile(wb, filename);
  }


  editModule(moduleId: number) {
    const module = this.modules().find(m => m.id === moduleId);

    console.log("Editing module with ID:", moduleId);
    console.log(module);

    if (!module) return;
    // Set editing state
    this.modules.update(currentModules =>
      currentModules.map(m =>
        m.id === moduleId ? { ...m, isEditing: true } : m
      )
    );
  }

  saveModule(moduleId: number) {
    console.log("Saving module with ID:", moduleId);
  }

  cancelModule() {
    this.isEditing.set(false);
  }
}
