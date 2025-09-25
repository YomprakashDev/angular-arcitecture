import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Button } from '../../../../../../shared/components/ui/button/button';
import { Tabs, Tab } from '../../../../../../shared/components/tabs/tabs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganizationService } from '../../services/organization.service';

import { OrganizationData } from '../../models/organization.model';
import { OrganizationDetails } from "../../components/organization-details/organization-details";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY, finalize } from 'rxjs';
import { AddOraganizationModel } from '../../components/add-oraganization-model/add-oraganization-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule,LogOut , CircleX ,MonitorCog ,SquarePen, FileText ,GripVertical,Eye  } from 'lucide-angular';
@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [
    Button, Tabs, CommonModule,
    MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule,
    MatProgressSpinnerModule,
    LucideAngularModule,
    AddOraganizationModel,
  ],
  templateUrl: './organization-page.html',
  styleUrls: ['./organization-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPage {
  // tabs + UI flags
  readonly tabs = signal<Tab[]>([
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ]);
  readonly isAddOrganizationModalOpen = signal(false);
  readonly activeTab = signal<'active' | 'inactive'>('active');
  readonly searchTerm = signal('');
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
 readonly viewIcon = Eye
 readonly editIcon = SquarePen
 readonly deleteIcon = GripVertical
 readonly fileIcon = FileText
 readonly cogIcon = MonitorCog
 readonly logoutIcon = LogOut
 readonly closeIcon = CircleX


   // Raw data source (used directly by the table)
   readonly organizations = signal<OrganizationData[]>([]);
  // IMPORTANT: datasource typed to nested API model
  dataSource = new MatTableDataSource<OrganizationData>([]);

  // table columns
  readonly displayedColumns = ['actions', 'organization', 'contactPerson', 'email', 'phone'] as const;

  // services
  private readonly organizationService = inject(OrganizationService);

 constructor() {
    // Load data into organizations() and stop spinner; show a simple error on failure
    this.organizationService
      .getOrganizations()
      .pipe(
        takeUntilDestroyed(),
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          console.error(err);
          this.error.set('Failed to load organizations.');
          return EMPTY;
        })
      )
      .subscribe((res) => this.organizations.set(res));
  }

  // events
  setActiveTab(tabId: string) {
    this.activeTab.set(tabId === 'inactive' ? 'inactive' : 'active');
  }
  addOrganization() {
    this.isAddOrganizationModalOpen.set(true);
  }
  closeModal() {
    this.isAddOrganizationModalOpen.set(false);
  }


}
