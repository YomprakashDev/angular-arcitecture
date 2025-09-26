import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { Button } from '../../../../../../shared/components/ui/button/button';
import { Tabs, Tab } from '../../../../../../shared/components/tabs/tabs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganizationService } from '../../services/organization.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { OrganizationData } from '../../models/organization.model';
import { OrganizationDetails } from "../../components/organization-details/organization-details";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY, finalize } from 'rxjs';
import { AddOraganizationModel } from '../../components/add-oraganization-model/add-oraganization-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule, LogOut, CircleX, MonitorCog, SquarePen, FileText, GripVertical, Eye } from 'lucide-angular';
@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [
    Button, Tabs, CommonModule,
    MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule,
    MatProgressSpinnerModule,
    LucideAngularModule,
    AddOraganizationModel,
    OrganizationDetails,
    MatPaginatorModule

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



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Raw data source (used directly by the table)
  readonly organizations = signal<OrganizationData[]>([]);
  // IMPORTANT: datasource typed to nested API model
  dataSource = new MatTableDataSource<OrganizationData>([]);

  // table columns
  readonly displayedColumns = ['actions', 'organization', 'contactPerson', 'email', 'phone'] as const;

  // services
  private readonly organizationService = inject(OrganizationService);


  viewOrganizationDetails = signal<OrganizationData | null>(null);
  isViewOrganizationModalOpen = signal(false);
  isInactiveOrganizationModalOpen = signal(false);

  viewOrganization(org: OrganizationData) {
    this.viewOrganizationDetails.set(org);
    this.isViewOrganizationModalOpen.set(true);
  }

  cancleInactiveOrganization() {
    this.isInactiveOrganizationModalOpen.set(false);
  }

  inActiveOrganization(org: OrganizationData) {
    this.isInactiveOrganizationModalOpen.set(true);
    console.log(org)
  }
  constructor() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.isLoading.set(true);
    this.organizationService.getOrganizations()
      .pipe(
        catchError((err) => {
          this.error.set(err.message);
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed()
      )
      .subscribe((orgs) => {
        this.organizations.set(orgs);
        this.dataSource = new MatTableDataSource(orgs);
        this.dataSource.paginator = this.paginator;
      });
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
