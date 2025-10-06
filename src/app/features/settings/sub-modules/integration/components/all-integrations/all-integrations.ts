import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-integrations',
  imports: [CommonModule],
  templateUrl: './all-integrations.html',
  styleUrl: './all-integrations.css'
})
export class AllIntegrations {
integrations = [
    {
      name: 'Adobe Sign',
      icon: 'adobe-sign',
      description: 'Streamline electronic signing workflows.'
    },
    {
      name: 'OneDrive',
      icon: 'onedrive',
      description: 'Secure cloud storage for contracts.'
    },
    {
      name: 'Stripe',
      icon: 'stripe',
      description: 'Automate payment collection for signed contracts.'
    },
    {
      name: 'OneDrive',
      icon: 'onedrive',
      description: 'Secure cloud storage for contracts.'
    },
    {
      name: 'Adobe Sign',
      icon: 'adobe-sign',
      description: 'Streamline electronic signing workflows.'
    },
    {
      name: 'OneDrive',
      icon: 'onedrive',
      description: 'Secure cloud storage for contracts.'
    },
    {
      name: 'Stripe',
      icon: 'stripe',
      description: 'Automate payment collection for signed contracts.'
    },
    {
      name: 'OneDrive',
      icon: 'onedrive',
      description: 'Secure cloud storage for contracts.'
    }
  ];
}
