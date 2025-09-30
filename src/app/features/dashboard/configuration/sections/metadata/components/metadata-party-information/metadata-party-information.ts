import { Component, signal } from '@angular/core';
import { Tabs } from "../../../../../../../shared/components/tabs/tabs";
import { Button } from "../../../../../../../shared/components/ui/button/button";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // For the switch

@Component({
  selector: 'app-metadata-party-information',
  imports: [Tabs, Button, MatTableModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './metadata-party-information.html',
  styleUrl: './metadata-party-information.css'
})
export class MetadataPartyInformation {
  readonly tabs = signal([
    { id: 'party-information', label: 'Party Information' },
    { id: 'life-cycle', label: ' Life Cycle' },
    { id: 'general', label: 'General' },
    { id: 'contact-infromation', label: 'Contact Infromation' },
  ]);

   // Define the columns in the desired display order
  displayedColumns: string[] = ['action', 'status', 'handle', 'fieldName', 'type', 'prompt'];

  // Static Data matching the image
   fieldsData= [
    { action: '', status: true, fieldName: 'Execution Date', type: 'Date', prompt: 'Select the date when the contract was officially signed and executed' },
    { action: '', status: true, fieldName: 'Post-Execution Status', type: 'Duration', prompt: 'Specify the current status of the contract after execution (e.g., Active, Pending, Terminated)' },
    { action: '', status: true, fieldName: 'Renewal Type', type: 'Dropdown', prompt: 'Choose the applicable renewal type (e.g., Auto-renewal, Manual renewal, Fixed-term renewal)' },
    { action: '', status: true, fieldName: 'Expiration Date', type: 'Date', prompt: 'Enter the date on which the contract will expire, if applicable' },
    { action: '', status: true, fieldName: 'Term Length', type: 'Dropdown', prompt: 'Select the duration of the contract term (e.g., 1 year, 3 years, 5 years)' },
    { action: '', status: true, fieldName: 'Effective Date', type: 'Date', prompt: 'Enter the date when the contract terms and obligations come into effect.' },
  ];


  currentActiveTab = signal('party-information');

}
