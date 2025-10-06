import { Component } from '@angular/core';
import { Card } from "../../../../../shared/components/ui/card/card";
import { CommonModule } from '@angular/common';
import { AppIcons } from '../../../../../../assets/icons/icons';
import { Button } from "../../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-access-control',
  imports: [Card, CommonModule, Button, LucideAngularModule],
  templateUrl: './access-control.html',
  styleUrl: './access-control.css'
})
export class AccessControl {
  // Static data array to populate the table
  accessData = [
    {
      team: 'HR Team',
      contractTypes: ['MSA', 'NDA', 'Employment Agreement'],
      lastUpdated: '05 Aug 2025 at 11:00 am',
    },
    {
      team: 'Legal Team',
      contractTypes: ['MSA', 'NDA'],
      lastUpdated: '03 Aug 2025 at 12:00 am',
    },
    {
      team: 'Sales Team',
      contractTypes: ['MSA', 'NDA'],
      lastUpdated: '05 Aug 2025 at 11:00 am',
    },
    {
      team: 'Operations Team',
      contractTypes: ['MSA', 'NDA', 'Employment Agreement'],
      lastUpdated: '03 Aug 2025 at 12:00 am',
    },
    // Added a 5th entry to match the "Showing 1 to 5 of 5" text in the image
    {
      team: 'Finance Team',
      contractTypes: ['MSA'],
      lastUpdated: '02 Aug 2025 at 09:00 am',
    },
  ];

  icons = AppIcons;

}
