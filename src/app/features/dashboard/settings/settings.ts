import { Component, signal } from '@angular/core';
import { Tabs } from "../components/tabs/tabs";
import { Teams } from "./sub-pages/teams/teams";
import { Users } from "./sub-pages/users/users";
import { AccessControl } from "./sub-pages/access-control/access-control";
import { Firm } from "./sub-pages/firm/firm";
import { OrganizationProfile } from "./sub-pages/organization-profile/organization-profile";
import { Integration } from "./sub-pages/integration/integration";
import { Security } from "./sub-pages/security/security";

@Component({
  selector: 'app-settings',
  imports: [Tabs, Teams, Users, AccessControl, Firm, OrganizationProfile, Integration, Security],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  readonly tabs = signal([
    { id: 'teams', label: 'Teams' },
    { id: 'users', label: 'Users' },
    { id: 'access-control', label: 'Access Control' },
    { id: 'firm', label: 'Firm' },
    { id: 'organization-profile', label: 'Organization Profile' },
    { id: 'integration', label: 'Integration' },
    { id: 'security', label: 'Security' }
  ]);

  readonly currentTab = signal<string | null>('teams');

  setActiveTab(tabId:string){
    this.currentTab.set(tabId);
  }

}
