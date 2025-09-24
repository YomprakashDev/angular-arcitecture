import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Tabs } from "../../../../shared/components/tabs/tabs";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

/**
 * A container component for the site administration section.
 * It uses a tabbed interface to navigate between different admin features.
 */

type SiteAdminTab = 'modules' | 'sub-modules' | 'packages' | 'organizations';

@Component({
  selector: 'app-site-admin-page',
  standalone: true,
  imports: [Tabs,RouterOutlet],
  templateUrl: './site-admin-page.html',
  styleUrls: ['./site-admin-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteAdminPage {
  /**
   * Defines the configuration for the navigation tabs.
   */
  tabs = signal([
    { id: 'modules', label: 'Modules' },
    { id: 'sub-modules', label: 'Sub-Modules' },
    { id: 'packages', label: 'Packages' },
    { id: 'organizations', label: 'Organizations' },
  ]);


   private router = inject(Router);
  private route = inject(ActivatedRoute);


    constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => {
        // deepest child under /admin
        let child = this.route.firstChild;
        while (child?.firstChild) child = child.firstChild;
        return ((child?.routeConfig?.path ?? 'modules') as SiteAdminTab);
      })
    ).subscribe(tab => this.currentTab.set(tab));
  }

  /**
   * Tracks the ID of the currently active tab.
   */
  readonly currentTab = signal<string | null>('modules');

  /**
   * Updates the current tab when the user selects a new one.
   * @param tabId The ID of the selected tab.
   */
  setActiveTab(tabId:string){
   this.router.navigate([tabId], { relativeTo: this.route });
  }

}
