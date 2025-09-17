import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Button } from '../../../../../../shared/components/ui/button/button';
import { Tabs, Tab } from '../../../../../../shared/components/tabs/tabs';

/**
 * Represents an organization in the list.
 */
interface Organization {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

/**
 * A page for displaying and managing organizations.
 * It features tab-based filtering (Active/Inactive), a search bar,
 * and a modal for adding new organizations.
 */
@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [Button, Tabs],
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

  /**
   * The source of truth for the list of organizations.
   */
  organizations = signal<Organization[]>([
    { id: 1, name: 'Google', email: 'contact@google.com', active: true },
    { id: 2, name: 'Microsoft', email: 'contact@microsoft.com', active: true },
    { id: 3, name: 'Apple', email: 'contact@apple.com', active: true },
    { id: 4, name: 'Netflix', email: 'contact@netflix.com', active: false },
    { id: 5, name: 'Meta', email: 'contact@meta.com', active: true },
    { id: 6, name: 'Amazon', email: 'contact@amazon.com', active: false },
  ]);

  /**
   * A computed signal that filters organizations based on the active tab and search term.
   */
  filteredOrganizations = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    return this.organizations().filter((org) => {
      const isActive = this.activeTab() === 'active';
      const matchesSearch = org.name.toLowerCase().includes(searchTerm) || org.email.toLowerCase().includes(searchTerm);
      return org.active === isActive && matchesSearch;
    });
  });

  /**
   * Sets the active tab.
   */
  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }

  /**
   * Updates the search term signal when the user types in the search input.
   */
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }



  /**
   * Placeholder for the export functionality.
   */
  exportOrganizations() {
    // TODO: Implement export organizations logic
    console.log('Export organizations');
  }
}
