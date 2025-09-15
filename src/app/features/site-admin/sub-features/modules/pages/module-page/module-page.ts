import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
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
  CdkDropList, CdkDrag],
  templateUrl: './module-page.html',
  styleUrls: ['./module-page.css']
})
export class ModulePage {

  displayedColumns: string[] = ['actions', 'status', 'moduleName', 'description', 'icon'];

 
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
    }
  ]);
drop(event: CdkDragDrop<ModuleItem[]>) {
  const previousIndex =  this.modules().findIndex((d) => d === event.item.data);
    moveItemInArray(this.modules(), previousIndex, event.currentIndex);
    
  }

  toggleModuleStatus(moduleId: number) {
    this.modules.update(currentModules =>
      currentModules.map(module =>
        module.id === moduleId
          ? { ...module, status: !module.status }
          : module
      )
    );
  }



}
