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
import * as XLSX from 'xlsx';
import { OrganizationData } from '../../models/organization.model';
import { OrganizationDetails } from "../../components/organization-details/organization-details";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, EMPTY, finalize } from 'rxjs';
import { AddOraganizationModel } from '../../components/add-oraganization-model/add-oraganization-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule, } from 'lucide-angular';
import { AppIcons } from '../../../../../../../assets/icons/icons';
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

  icons = AppIcons;




  readonly organizations = signal<OrganizationData[]>([]);

  dataSource = new MatTableDataSource<OrganizationData>([]);

  @ViewChild(MatPaginator)
  set matPaginator(p: MatPaginator) {
    if (p) {
      this.paginator = p;
      this.dataSource.paginator = p;
    }
  }
  private paginator!: MatPaginator;


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

  loadOrganizations(): void {
    this.isLoading.set(true);
    this.error.set(null);

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
        this.dataSource.data = orgs;
        if (this.paginator) this.paginator.firstPage();
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


  exportToExcel() {
    // 1. Get your data (from signal)
    const orgs = this.organizations();

    if (!orgs || orgs.length === 0) {
      console.warn('No data to export');
      return;
    }

    // 2. Map data into flat rows (because Excel sheets don’t support nested objects directly)
    const exportData = orgs.map((org, index) => ({
      '#': index + 1,
      'Organization Name': org.orgDetails?.organizationName ?? '',
      'Industry': org.orgDetails?.industryName ?? '',
      'Website': org.orgDetails?.organizationalURL ?? '',
      'GST Number': org.orgDetails?.gstNumber ?? '',
      'Address': org.orgDetails?.address ?? '',
      'Zip Code': org.orgDetails?.zipCode ?? '',
      'State': org.orgDetails?.stateName ?? '',
      'Country': org.orgDetails?.countryName ?? '',
      'Currency': org.orgDetails?.currencyCode ?? '',
      'Time Zone': org.orgDetails?.timeZone ?? '',
      'Contact Person': org.contactDetails?.contactPersonName ?? '',
      'Phone': org.contactDetails?.contactNumber ?? '',
      'Email': org.contactDetails?.emailID ?? '',
      'Package': org.packageInfo?.packageName ?? '',
      'Users': org.packageInfo?.userCount ?? '',
      'Deal Amount': org.packageInfo?.dealAmount ?? '',
      'GST': org.packageInfo?.gst ?? '',
      'Start Date': org.packageInfo?.startDate ?? '',
      'Valid Upto': org.packageInfo?.validUpto ?? ''
    }));

    // 3. Convert to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // 4. Create workbook and append worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Organizations');

    // 5. Save as Excel file
    XLSX.writeFile(wb, 'organizations.xlsx');
  }





}
