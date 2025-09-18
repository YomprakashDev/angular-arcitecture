import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Button } from '../../../../../../shared/components/ui/button/button';
import { Tabs, Tab } from '../../../../../../shared/components/tabs/tabs';
import { MenuItemComponent } from "../../../../../../shared/components/ui/menu-item/menu-item";

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Modal } from "../../../../../../shared/components/ui/modal/modal";
import { AddOrganizationForm } from "../../components/add-organization-form/add-organization-form";

export interface OrganizationItem {
  id: number;
  organization: string;
  contactPerson: string;
  email: string;
  phone: string;
}

/**
 * A page for displaying and managing organizations.
 * It features tab-based filtering (Active/Inactive), a search bar,
 * and a modal for adding new organizations.
 */
@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [Button, Tabs, CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule, Modal, AddOrganizationForm],
  templateUrl: './organization-page.html',
  styleUrls: ['./organization-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPage {
  /**
   * Configuration for the tabs used to filter organizations.
   */
  tabs = signal<Tab[]>([
    { id: 'active', label: 'Active (12)' },
    { id: 'inactive', label: 'In-Active (8)' },
  ]);

  // State for the "Add Organization" modal.
  isAddOrganizationModalOpen = signal(false);
  // The currently active tab.
  activeTab = signal('active');
  // The current search term.
  searchTerm = signal('');
  displayedColumns: string[] = [
    'actions',
    'organization',
    'contactPerson',
    'email',
    'phone'
  ];

  // Seed data to match screenshot
  organizations = signal<OrganizationItem[]>([
    { id: 1, organization: 'Beta Ltd', contactPerson: 'John Doe', email: 'john@acme.com', phone: '9876543210' },
    { id: 2, organization: 'ZenoTech', contactPerson: 'Priya Sharma', email: 'priya@beta.com', phone: '9123456789' },
    { id: 3, organization: 'Acme Corp', contactPerson: 'Anil Kapoor', email: 'anil@zeno.com', phone: '7890123456' },
    { id: 4, organization: 'ZenoTech', contactPerson: 'Priya Sharma', email: 'priya@beta.com', phone: '9123456789' },
    { id: 5, organization: 'Beta Ltd', contactPerson: 'John Doe', email: 'john@acme.com', phone: '9876543210' },
    { id: 6, organization: 'Acme Corp', contactPerson: 'Anil Kapoor', email: 'anil@zeno.com', phone: '7890123456' },
  ]);

  /**
   * Sets the active tab.
   */
  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }


  addOrganization() {
    this.isAddOrganizationModalOpen.set(true);
  }



}
