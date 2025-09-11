import { Component, signal } from '@angular/core';
import { Tabs } from "../components/tabs/tabs";
import { CounterParty } from "./sub-pages/counter-party/counter-party";
import { ContractTypes } from "./sub-pages/contract-types/contract-types";
import { Tags } from "./sub-pages/tags/tags";
import { Metadata } from "./sub-pages/metadata/metadata";
import { Workflow } from "./sub-pages/workflow/workflow";

@Component({
  selector: 'app-configuration',
  imports: [Tabs, CounterParty, ContractTypes, Tags, Metadata, Workflow],
  templateUrl: './configuration.html',
  styleUrl: './configuration.css'
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
