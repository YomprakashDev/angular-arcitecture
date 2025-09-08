import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive,MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
 menuItems = [
    { icon: '🏠', route: '/dashboard', label: 'Dashboard' },
    { icon: '🛠️', route: '/site-admin', label: 'Site Admin' },
    { icon: '📄', route: '/contracts', label: 'Contracts' },
    { icon: '📂', route: '/repository', label: 'Repository' },
    { icon: '⚙️', route: '/configuration', label: 'Configuration' },
    { icon: '📚', route: '/library', label: 'Library' },
    { icon: '📊', route: '/reports', label: 'Reports' },
    { icon: '🔐', route: '/settings', label: 'Settings' }
  ];
}
