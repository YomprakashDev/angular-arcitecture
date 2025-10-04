import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";

// Interface for the Contact Details data structure
interface Contact {
  name: string;
  email: string;
  phone: string;
  role: string;
}

// Interface for the Address Details data structure
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  isPrimary?: boolean;
}
interface Contract {
  contractId: string;
  email: string;
  status: string;
  owner: string;
}
@Component({
  selector: 'app-view-counterparty-information',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './view-counterparty-information.html',
  styleUrl: './view-counterparty-information.css'
})
export class ViewCounterpartyInformation {
  // --- Counterparty Information ---
  public counterpartyName: string = 'InnoTech Pvt Ltd';
  public counterpartyType: string = 'Partner';
  public websiteUrl: string = 'https://contracts.yourdomain.com';

  public addresses: Address[] = [
    {
      street: 'Road no.5, phase 1, kbhp colony, Kukatapally.',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      isPrimary: true // Mark the first one as primary
    },
    {
      street: 'Road no.5, phase 1, kbhp colony, Kukatapally.',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    },
    {
      street: 'Road no.5, phase 1, kbhp colony, Kukatapally.',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    }
  ];

  // --- Contact Details ---
  public contacts: Contact[] = [
    { name: 'John Doe', email: 'john@gmail.com', phone: '7932986841', role: 'Manager' },
    { name: 'John Doe', email: 'john@gmail.com', phone: '7932986841', role: 'Manager' },
    { name: 'John Doe', email: 'john@gmail.com', phone: '7932986841', role: 'Manager' },
    { name: 'John Doe', email: 'john@gmail.com', phone: '7932986841', role: 'Manager' }
  ];
  // Define the columns to be displayed in the order you want
  displayedColumns: string[] = ['contractId', 'email', 'status', 'owner'];
  contracts: Contract[] = [
    { contractId: '#CT00123', email: 'Vendor Agreement', status: 'Draft', owner: 'Ravi Kumar' },
    { contractId: '#CT00145', email: 'NDA - Tech Partner', status: 'Executed', owner: 'Neha S.' },
    { contractId: '#CT00123', email: 'Vendor Agreement', status: 'Approval', owner: 'Ravi Kumar' },
    { contractId: '#CT00145', email: 'NDA - Tech Partner', status: 'Expired', owner: 'Neha S.' },
    { contractId: '#CT00123', email: 'Vendor Agreement', status: 'Due for Renewal', owner: 'Ravi Kumar' },
    { contractId: '#CT00145', email: 'NDA - Tech Partner', status: 'Signature Due', owner: 'Neha S.' },
    { contractId: '#CT00123', email: 'Vendor Agreement', status: 'Executed', owner: 'Ravi Kumar' },
    { contractId: '#CT00145', email: 'NDA - Tech Partner', status: 'Review', owner: 'Neha S.' },
    { contractId: '#CT00123', email: 'Vendor Agreement', status: 'Signature Due', owner: 'Ravi Kumar' },
    { contractId: '#CT00145', email: 'NDA - Tech Partner', status: 'Draft', owner: 'Neha S.' },
  ];


  getStatusClass(status: string) {
    switch (status) {
      case 'Draft':
        return 'text-blue-600';
      case 'Executed':
        return 'text-green-600';
      case 'Approval':
        return 'text-yellow-600';
      case 'Expired':
        return 'text-red-600';
      case 'Due for Renewal':
        return 'text-sky-600';
      case 'Signature Due':
        return 'text-orange-600';
      case 'Review':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  }

}
