import { Component, signal } from '@angular/core';
import { Tabs } from '../../../shared/components/tabs/tabs';
import { Teams } from '../sub-modules/teams/page/teams';
import { Users } from '../sub-modules/users/page/users';
import { AccessControl } from '../sub-modules/access-control/access-control';
import { Firm } from '../sub-modules/firm/firm';
import { OrganizationProfile } from '../sub-modules/organization-profile/organization-profile';
import { Integration } from '../sub-modules/integration/integration';
import { Security } from '../sub-modules/security/security';


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
