import { Component } from '@angular/core';

@Component({
  selector: 'app-organization-details',
  imports: [],
  templateUrl: './organization-details.html',
  styleUrl: './organization-details.css'
})
export class OrganizationDetails {
     organization = {
    logo: 'assets/logo.png', // place the bird logo here in assets folder
    name: 'ZenoTech',
    industry: 'Legal Services',
    url: 'https://contracts.yourdomain.com/ZenoTech',
    gstNumber: 'GSTIN875637',
    address: '#24, 5th Main Road, Indiranagar, Bengaluru, Karnataka, near CMH Road Metro Station, opposite XYZ Plaza,',
    postalCode: '345678',
    state: 'Karnataka',
    country: 'India',
    currency: 'GSTIN875637',
    timezone: 'UTC +5:30'
  };

  contact = {
    person: 'John Doe',
    email: 'John@gmail.com',
    phone: '9876786789',
    teamSize: '1000+',
    website: 'https://www.example.com'
  };

  package = {
    type: 'Premium',
    users: 20,
    dealAmount: 20000,
    gst: 2000,
    totalValue: 20000,
    startDate: '1 July 2025',
    validUpto: '3 July 2026'
  };
}
