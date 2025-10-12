import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  menuItems = [
    { tooltip: 'Dashboard', route: '/dashboard', icon: 'assets/icons/svgs/dashboard.svg' },
    { tooltip: 'Contracts', route: '/workflow', icon: 'assets/icons/svgs/workflow.svg' },
    { tooltip: 'Repository', route: '/repository', icon: 'assets/icons/svgs/repository.svg' },
    { tooltip: 'Configuration', route: '/configuration', icon: 'assets/icons/svgs/configuration.svg' },
    { tooltip: 'Library', route: '/library', icon: 'assets/icons/svgs/library.svg' },
    { tooltip: 'Reports', route: '/reports', icon: 'assets/icons/svgs/reports.svg' },
    { tooltip: 'Setting', route: '/settings', icon: 'assets/icons/svgs/settings.svg' },
  ];
}
