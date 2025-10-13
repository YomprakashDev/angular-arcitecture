import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Tabs } from '../../../shared/components/tabs/tabs';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [Tabs, RouterOutlet],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => {

        let child = this.route.firstChild;
        while (child?.firstChild) child = child.firstChild;
        return ((child?.routeConfig?.path ?? 'teams'));
      })
    ).subscribe(tab => this.currentTab.set(tab));
  }


  readonly currentTab = signal<string | null>('teams');

  setActiveTab(tabId: string) {
    this.router.navigate([tabId],
      { relativeTo: this.route });
  }

}
