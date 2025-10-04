import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Modal } from '../../../../../shared/components/ui/modal/modal';
import { AgreementWorkflow } from '../components/agreement-workflow/agreement-workflow';

type WorkflowRow = {
  name: string;
  contractType: string;
  description: string;
  createdBy: string;
  lastAction: string;
};
@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule, MatTableModule, Modal, AgreementWorkflow],
  templateUrl: './workflow.html',
  styleUrls: ['./workflow.css']
})
export class Workflow {
  // columns shown in the mat-table
  displayedColumns = [
    'actions',
    'name',
    'contractType',
    'description',
    'createdBy',
    'lastAction',
  ];

  isNewWorkflowModalOpen = signal(false);

  // static data (no functionality yet)
  rows: WorkflowRow[] = [
    {
      name: 'Finance -Single Template Work flow',
      contractType: 'NDA',
      description:
        'Streamlines NDA creation using a standard finance-approval flow.',
      createdBy: 'John Doe',
      lastAction: '09-Aug-2025 at 01:00 pm',
    },
    {
      name: 'Repository Ingestion-Legacy Template Workflow',
      contractType: 'MSA',
      description:
        'Uploads and organizes legacy MSAs into the CLM repository.',
      createdBy: 'John Doe',
      lastAction: '05-Aug-2025 at 11:00 am',
    },
    {
      name: 'Third-Party Paper-Legacy Template Workflow',
      contractType: 'SaaS',
      description:
        'Reviews, negotiates, and approves SaaS contracts received externally.',
      createdBy: 'John Doe',
      lastAction: '03-Aug-2025 at 02:00 pm',
    },
    {
      name: 'Template Approval-Single Template Workflow',
      contractType: 'Employment',
      description:
        'John DRoutes employment contract templates for internal use.',
      createdBy: 'John Doe',
      lastAction: '02-Aug-2025 at 08:00 pm',
    },
  ];
}
