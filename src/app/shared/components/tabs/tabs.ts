import { Component, input, OnInit, output, signal } from '@angular/core';

export interface Tab {
  id: string;
  label: string;
  data?: any;
}

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs implements OnInit {
tabs = input<Tab[]>([]);
defaultActiveTab = input<string | null>(null);

constructor(){
  if(this.defaultActiveTab){
    this.activeTab.set(this.defaultActiveTab());
  }
}

ngOnInit(): void {
  if(this.defaultActiveTab){
    this.activeTab.set(this.defaultActiveTab());
  }
}

  // output to notify parent
  tabChanged = output<Tab>();
  // internal active tab state
  activeTab = signal<string | null>(null);



  selectTab(tabId:string){
    this.activeTab.set(tabId);
    const selectedTab =  this.tabs().find(tab => tab.id === tabId);

    if(selectedTab){
      this.tabChanged.emit(selectedTab);
    }
  }
}
