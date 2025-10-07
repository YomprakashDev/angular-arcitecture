import { Component, signal } from '@angular/core';
import { Tabs } from '../../../../../shared/components/tabs/tabs';
import { MyIntegrations } from '../components/my-integrations/my-integrations';
import { AllIntegrations } from '../components/all-integrations/all-integrations';

@Component({
  selector: 'app-integration',
  imports: [ Tabs, MyIntegrations,
     AllIntegrations],
  templateUrl: './integration.html',
  styleUrl: './integration.css'
})
export class Integration {

  tabs = signal([
    { id: 'my-integrations', label: 'My Integrations' },
    { id: 'all', label: 'All' },
  ])

  currentActiveTab = signal('my-integrations')

  setActiveTab(tabId:string){
    this.currentActiveTab.set(tabId);
  }
}
