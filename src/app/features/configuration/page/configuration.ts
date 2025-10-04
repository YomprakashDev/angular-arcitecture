import { Component, signal } from '@angular/core';
import { Tabs } from '../../../shared/components/tabs/tabs';
import { CounterParty } from '../sub-modules/counter-party/page/counter-party';
import { ContractTypes } from '../sub-modules/contract-types/page/contract-types';
import { Tags } from '../sub-modules/tags/tags';
import { Metadata } from '../sub-modules/metadata/metadata';
import { Workflow } from '../sub-modules/workflow/page/workflow';


@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [Tabs, CounterParty, ContractTypes, Tags, Metadata, Workflow],
  templateUrl: './configuration.html',
  styleUrls: ['./configuration.css']
})
export class Configuration {
  readonly tabs = signal([
    { id: 'counter-party', label: 'Counter Party' },
    { id: 'contract-types', label: 'Contract Types' },
    { id: 'tags', label: 'Tags' },
    { id: 'metadata', label: 'Metadata' },
    { id: 'workflow', label: 'Workflow' },
  ]);

  readonly currentTab = signal<string | null>('counter-party');

  setActiveTab(tabId:string){
    this.currentTab.set(tabId);
  }

}
