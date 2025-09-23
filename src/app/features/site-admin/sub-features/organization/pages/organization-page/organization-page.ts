import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Button } from '../../../../../../shared/components/ui/button/button';
import { Tabs, Tab } from '../../../../../../shared/components/tabs/tabs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Modal } from '../../../../../../shared/components/ui/modal/modal';
import { AddOrganizationForm } from '../../components/add-organization-form/add-organization-form';
import { OrganizationService } from '../../services/organization.service';
import { LucideAngularModule, X } from 'lucide-angular';

import { OrganizationData } from '../../models/organization.model';
import { OrganizationDetails } from "../../components/organization-details/organization-details";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { Stepper } from "../../components/stepper/stepper";

@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [
    Button, Tabs, CommonModule,
    MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule,
    AddOrganizationForm,
    MatProgressSpinnerModule,
    LucideAngularModule,
    Stepper
  ],
  templateUrl: './organization-page.html',
  styleUrls: ['./organization-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPage {
  // UI state
  tabs = signal<Tab[]>([
    { id: 'active', label: 'Active (12)' },
    { id: 'inactive', label: 'In-Active (8)' },
  ]);
  isAddOrganizationModalOpen = signal(false);
  activeTab = signal('active');
  searchTerm = signal('');

  displayedColumns: string[] = [
    'actions',
    'organization',
    'contactPerson',
    'email',
    'phone',
  ];


  currentStep = signal<number>(0);

  updateCurrentStep() {
    this.currentStep.update(i => i + 1);
  }

  readonly closeIcon = X;

  closeModal() {
    this.isAddOrganizationModalOpen.set(false);
  }

  isLoading = signal(true);

  stepLabels = ['Company Information', 'Package Information', 'Support Credentials']

  isLastStep = computed(() => this.currentStep() === this.stepLabels.length - 1)
  isFirstStep = computed(() => this.currentStep() === 0)


  prevStep() {
    if (this.currentStep() > 0)
      this.currentStep.update(i => i - 1);
  }

  private organizationService = inject(OrganizationService);

  // IMPORTANT: datasource typed to nested API model
  dataSource = new MatTableDataSource<OrganizationData>([]);

  title = signal('Organizations');
  constructor() {

    // Load data
    this.organizationService.getOrganizations().pipe(finalize(() => {
      this.isLoading.set(false);
    }))
      .subscribe({
        next: (res: OrganizationData[]) => {
          this.dataSource.data = res
        },
        error: err => console.error(err)
      });
  }

  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
    // If tab switches should filter, add logic here
  }

  addOrganization() {
    this.isAddOrganizationModalOpen.set(true);
  }


}
