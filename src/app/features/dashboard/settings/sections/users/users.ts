import { Component, signal } from '@angular/core';
import { Card } from "../../../../../shared/components/ui/card/card";
import { Button } from "../../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../assets/icons/icons';
import { Tab, Tabs } from '../../../../../shared/components/tabs/tabs';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  email: string;
  role: string;
  jobTitle: string;
  team: string;
  lastAction: string;
}

@Component({
  selector: 'app-users',
  imports: [Card,CommonModule, Button, LucideAngularModule, Tabs],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
icons = AppIcons;

activeTab = signal('active');

setActiveTab(tabId: string) {
  this.activeTab.set(tabId);
}

addUser() {}
  // tabs + UI flags
  readonly tabs = signal<Tab[]>([
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ]);


 users: User[] = [
    {
      name: 'Pramod',
      email: 'pramod123@gmail.com',
      role: 'Business user',
      jobTitle: 'Legal Counsel',
      team: 'Legal Team',
      lastAction: '09-Aug-2025 at 01:00 pm'
    },
    {
      name: 'Sumanth',
      email: 'sumanth123@gmail.com',
      role: 'Legal user',
      jobTitle: 'HR',
      team: 'HR Team',
      lastAction: '05-Aug-2025 at 11:00 am'
    },
    {
      name: 'Kalyan Kumar',
      email: 'kalyan123@gmail.com',
      role: 'Admin',
      jobTitle: 'Sales Manager',
      team: 'Sales Team',
      lastAction: '03-Aug-2025 at 02:00 pm'
    },
    {
      name: 'Nithin',
      email: 'nithin123@gmail.com',
      role: 'Business User',
      jobTitle: 'Manager',
      team: 'Operations Manager',
      lastAction: '02-Aug-2025 at 08:00 pm'
    }
  ];

}
