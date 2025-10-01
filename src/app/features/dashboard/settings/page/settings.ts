import { Component, signal } from '@angular/core';
import { Tabs } from "../../../../shared/components/tabs/tabs";
import { Teams } from "../sections/teams/teams";
import { Users } from "../sections/users/users";
import { AccessControl } from "../sections/access-control/access-control";
import { Firm } from "../sections/firm/firm";
import { OrganizationProfile } from "../sections/organization-profile/organization-profile";
import { Integration } from "../sections/integration/integration";
import { Security } from "../sections/security/security";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [Tabs, Teams, Users, AccessControl, Firm, OrganizationProfile, Integration, Security],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
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
