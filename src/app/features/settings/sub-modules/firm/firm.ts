import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from "../../../../shared/components/ui/button/button";
import { AppIcons } from '../../../../../assets/icons/icons';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-firm',
  imports: [CommonModule, Button, LucideAngularModule],
  templateUrl: './firm.html',
  styleUrl: './firm.css'
})
export class Firm {

  icons = AppIcons;
//  Static array with two companies
  companies = [
    {
      companyName: 'IGuru Portal Services Pvt Ltd',
      tag: 'Primary',
      firmName: 'Beta Pvt Ltd',
      jurisdiction: 'India',
      companyType: 'Private Limited Company',
      address:
        '#24, 5th Main Road, Indiranagar, Bengaluru, Karnataka, near CMH Road Metro Station, opposite XYZ Plaza,',
      postalCode: '345678',
      country: 'India',
      timeFormat: 'DD:MM:YYYY, HH:mm:ss, UTC +5:30',
      dateFormat: 'DD/MM/YYYY',
      emailLogo: 'Custom',
    },
    {
      companyName: 'Alpha Technologies LLP',
      firmName: 'Alpha LLP',
      jurisdiction: 'India',
      companyType: 'Limited Liability Partnership',
      address:
        '#101, MG Road, Pune, Maharashtra, opposite Green Plaza, near Metro Mall,',
      postalCode: '411001',
      country: 'India',
      timeFormat: 'MM-DD-YYYY, HH:mm:ss, UTC +5:30',
      dateFormat: 'MM/DD/YYYY',
      emailLogo: 'Standard',
    },
  ];
}
