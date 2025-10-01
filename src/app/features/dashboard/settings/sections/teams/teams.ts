import { Component, signal } from '@angular/core';
import { Card } from "../../../../../shared/components/ui/card/card";
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Button } from "../../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../assets/icons/icons';
import { Tab, Tabs } from '../../../../../shared/components/tabs/tabs';
import { Modal } from "../../../../../shared/components/ui/modal/modal";

interface Team {
  id: number;
  name: string;
  description: string;
  lead: { name: string; avatarUrl?: string };
  count: number;
  lastAction: string;
}

@Component({
  standalone: true,
  selector: 'app-teams',
  imports: [Card, MatTable, MatTableModule, Button, LucideAngularModule, Tabs, Modal],
  templateUrl: './teams.html',
  styleUrls: ['./teams.css'],
})
export class Teams {

  // tabs + UI flags
  readonly tabs = signal<Tab[]>([
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ]);

  activeTab = signal<string>('active');

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  // Tabs (static)
  activeCount = 12;
  inactiveCount = 8;

  isTeamAdding = signal(false);
  isTeamEditing = signal(false);
  isTeamDeleting = signal(false);
  isTeamCountViewing = signal(false);

  displayedColumns = ['actions', 'teamName', 'description', 'teamLead', 'count', 'lastAction'];
  icons = AppIcons;

  addTeam(){
    this.isTeamAdding.set(true);
  }

  editTeam(){
    this.isTeamEditing.set(true);
  }

  deleteTeam(){
    this.isTeamDeleting.set(true);
  }

  viewTeamCount(){
    this.isTeamCountViewing.set(true);
  }

  dataSource = new MatTableDataSource<Team>([
    {
      id: 1,
      name: 'Legal',
      description: 'Handles review and legal checks of contracts before approval',
      lead: { name: 'Pramod' },
      count: 4,
      lastAction: '09-Aug-2025 at 01:00 pm',
    },
    {
      id: 2,
      name: 'Finance',
      description: 'Ensures contracts meet regulatory and compliance requirements',
      lead: { name: 'Sumanth' },
      count: 12,
      lastAction: '05-Aug-2025 at 11:00 am',
    },
    {
      id: 3,
      name: 'Sales',
      description: 'Creates initial contract drafts based on business needs',
      lead: { name: 'Anvitha Sen' },
      count: 20,
      lastAction: '06-Aug-2025 at 01:00 pm',
    },
    {
      id: 4,
      name: 'Ops',
      description: 'Final authority for contract sign-off',
      lead: { name: 'Sanjana' },
      count: 24,
      lastAction: '04-Aug-2025 at 11:00 am',
    },
  ]);


}
