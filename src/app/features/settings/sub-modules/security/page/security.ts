import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-security',
  imports: [],
  templateUrl: './security.html',
  styleUrl: './security.css'
})
export class Security {
  tabs = signal([
    { id: 'authentication', label: 'Authentication' },
    { id: 'enabled', label: 'Enabled' },
  ]);

  currentActiveTab = signal('authentication');


}
