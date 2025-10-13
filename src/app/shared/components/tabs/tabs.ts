import { Component, effect, input, OnInit, output, signal } from '@angular/core';

export interface Tab {
  id: string;
  label: string;
  data?: any;
}

@Component({
  standalone: true,
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css']
})
export class Tabs {
  tabs = input<Tab[]>([]);
  defaultActiveTab = input<string | null>(null);
  activeTabInput = input<string | null>(null);
  // local state (for uncontrolled / instant visual response)
  private _activeLocal = signal<string | null>(null);

  
  constructor() {
    // initialize with default (if provided)
    const def = this.defaultActiveTab();
    if (def != null) this._activeLocal.set(def);

    // SYNC: parent-driven active tab → component state
    // (runs in constructor = valid injection context)
    effect(() => {
      const controlled = this.activeTabInput(); 
      if (controlled != null) {
        this.activeTab.set(controlled);
      } else {
        this.activeTab.set(this._activeLocal());
      }
    });
  }

  // output to notify parent
  tabChanged = output<Tab>();
  // internal active tab state
  activeTab = signal<string | null>(null);



  selectTab(tabId: string) {
    this.activeTab.set(tabId);
    const selectedTab = this.tabs().find(tab => tab.id === tabId);

    if (selectedTab) {
      this.tabChanged.emit(selectedTab);
    }
  }
}
