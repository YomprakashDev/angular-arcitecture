import { Component, inject, signal } from '@angular/core';
import { Card } from "../../../../../shared/components/ui/card/card";
import { MatTable, MatTableModule } from '@angular/material/table';
import { Button } from "../../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../assets/icons/icons';
import { Tab, Tabs } from '../../../../../shared/components/tabs/tabs';
import { Modal } from "../../../../../shared/components/ui/modal/modal";
import { ConfirmDialog } from "../../../../../shared/components/ui/confirm-dialog/confirm-dialog";
import { TeamsService } from '../services/teams.service';
import { Team } from '../model/teams.model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';



@Component({
  standalone: true,
  selector: 'app-teams',
  imports: [Card, FormsModule, MatTable, MatTableModule, Button, LucideAngularModule, Tabs, Modal, ConfirmDialog],
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

  temaName = signal<string>('');
  teamLead = signal<string>('');
  teamDescription = signal<string>('');

  // Tabs (static)
  activeCount = 12;
  inactiveCount = 8;

  isTeamAdding = signal(false);
  isTeamEditing = signal(false);
  isTeamActiveOrInactive = signal(false);
  isTeamCountViewing = signal(false);

  displayedColumns = ['actions', 'teamName', 'description', 'teamLead', 'count', 'lastAction'];
  icons = AppIcons;

  addTeam() {
    this.isTeamAdding.set(true);
  }

  editTeam() {
    this.isTeamEditing.set(true);
  }

  statusChange() {
    this.isTeamActiveOrInactive.set(true);
  }

  viewTeamCount() {
    this.isTeamCountViewing.set(true);
  }

  saveAddNewTeam() {

    const payload = {
      "teamName": "Product Development",
      "teamCode": "Product",
      "createdDate": "2025-10-06T05:02:54.872Z",
      "modifiedDate": "2025-10-06T05:45:30.120Z"
    }
    this.teamsService.addNewTeam(payload)
      .pipe().subscribe(res => console.log(res))
  }



  isLoading = signal(true);
  error = signal<string | null>(null);
  teamsData = signal<Team[]>([]);

  teamsService = inject(TeamsService);

  constructor() {
    this.loadTeams();
  }


  loadTeams() {
    this.teamsService.getAllTeamsData()
      .pipe(
        catchError((err) => {
          this.error.set(err.message);
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed()
      )
      .subscribe((res) => {
        this.teamsData.set(res);
      })
  }
}
