import { Component, signal } from '@angular/core';
import { Tabs } from "../../../../shared/components/tabs/tabs";
import { CounterParty } from "../../configuration/sections/counter-party/counter-party";
import { ContractTypes } from "../../configuration/sections/contract-types/contract-types";
import { Tags } from "../../configuration/sections/tags/tags";
import { Metadata } from "../../configuration/sections/metadata/metadata";
import { Workflow } from "../../configuration/sections/workflow/workflow";

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
