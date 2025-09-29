import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LucideAngularModule, SquarePen, Download, Trash2 } from 'lucide-angular';
import { Button } from "../../../../../shared/components/ui/button/button";
import { Modal } from "../../../../../shared/components/ui/modal/modal";

interface ContractTypeRow {
  id: number;
  active: boolean;
  contractType: string;
  workflow: string;
  modifiedBy: string;
  lastModifiedOn: string; // ISO or formatted
}


@Component({
  selector: 'app-contract-types',
  imports: [CommonModule, MatTableModule, MatSlideToggleModule, MatPaginatorModule, MatProgressSpinnerModule, LucideAngularModule, Button, Modal],
  templateUrl: './contract-types.html',
  styleUrl: './contract-types.css'
})
export class ContractTypes {
  // --- Icons (same pattern you use elsewhere)
  readonly editIcon = SquarePen;
  readonly downloadIcon = Download;
  readonly deleteIcon = Trash2;

  // --- UI state
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  // --- filters
  readonly search = signal('');
  readonly typeFilter = signal<string>(''); // empty => all

  // --- table
  readonly displayedColumns = ['actions', 'status', 'contractType', 'workflow', 'modifiedBy', 'lastModifiedOn'] as const;

  // --- data (mock; replace with service call)
   readonly rows = signal<ContractTypeRow[]>([
    { id: 1, active: false, contractType: 'MSA', workflow: 'Approval Flow 1', modifiedBy: 'John Doe', lastModifiedOn: '12 Jul 25 at 1:30 PM' },
    { id: 2, active: true, contractType: 'Employeeement Agreement', workflow: 'Approval Flow 2', modifiedBy: 'Jane Lee', lastModifiedOn: '05 Jun 25 at 12:30 PM' },
    { id: 3, active: false, contractType: 'NDA', workflow: 'Approval Flow 1', modifiedBy: 'John Doe', lastModifiedOn: '12 Jul 25 at 2:30 PM' },
    { id: 4, active: true, contractType: 'Service Agreement', workflow: 'Approval Flow 2', modifiedBy: 'Jane Lee', lastModifiedOn: '05 Jun 25 at 1:00 PM' },
    { id: 5, active: true, contractType: 'SOW', workflow: 'Approval Flow 1', modifiedBy: 'John Doe', lastModifiedOn: '01 May 25 at 10:00 AM' },
  ]);

  addNewContractTypeModalOpen = signal(false);
  addContractTypes(){
    this.addNewContractTypeModalOpen.set(true);

  }
}
