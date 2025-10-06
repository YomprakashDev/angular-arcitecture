import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-integrations',
  imports: [CommonModule],
  templateUrl: './my-integrations.html',
  styleUrl: './my-integrations.css'
})
export class MyIntegrations {
integrations = [
    {
      name: 'DocuSign',
      icon: 'docusign',
      timestamp: '14 Aug 2025, 10:32 AM',
      description: 'Send contracts for e-signature directly from CLM.'
    },
    {
      name: 'Salesforce',
      icon: 'salesforce',
      timestamp: '14 Aug 2025, 09:50 AM',
      description: 'Sync contract data with customer accounts.'
    },
    {
      name: 'Google Drive',
      icon: 'google-drive',
      timestamp: '14 Aug 2025, 09:15 AM',
      description: 'Store and access contract files in Drive.'
    },
    {
      name: 'DocuSign',
      icon: 'docusign',
      timestamp: '14 Aug 2025, 10:32 AM',
      description: 'Send contracts for e-signature directly from CLM.'
    },
    {
      name: 'DocuSign',
      icon: 'docusign',
      timestamp: '14 Aug 2025, 10:32 AM',
      description: 'Send contracts for e-signature directly from CLM.'
    },
    {
      name: 'Salesforce',
      icon: 'salesforce',
      timestamp: '14 Aug 2025, 09:50 AM',
      description: 'Sync contract data with customer accounts.'
    },
    {
      name: 'Google Drive',
      icon: 'google-drive',
      timestamp: '14 Aug 2025, 09:15 AM',
      description: 'Store and access contract files in Drive.'
    },
    {
      name: 'DocuSign',
      icon: 'docusign',
      timestamp: '14 Aug 2025, 10:32 AM',
      description: 'Send contracts for e-signature directly from CLM.'
    }
  ];
}
