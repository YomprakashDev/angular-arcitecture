// features/settings/settings.routes.ts
import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
// (optional) gate Settings behind auth/role
// import { AuthService } from '../../auth/data-access/auth.service';
// const settingsGuard = () => inject(AuthService).isLoggedIn()
//   ? true
//   : inject(Router).createUrlTree(['/login']);

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    title: 'Settings',
   
    loadComponent: () =>
      import('./page/settings').then(m => m.Settings),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'teams' },

      { path: 'teams',               title: 'Settings • Teams',
        loadComponent: () => import('./sub-modules/teams/page/teams').then(m => m.Teams)
      },
      { path: 'users',               title: 'Settings • Users',
        loadComponent: () => import('./sub-modules/users/page/users').then(m => m.Users)
      },
      { path: 'access-control',      title: 'Settings • Access Control',
        loadComponent: () => import('./sub-modules/access-control/page/access-control').then(m => m.AccessControl)
      },
      { path: 'firm',                title: 'Settings • Firm',
        loadComponent: () => import('./sub-modules/firm/firm').then(m => m.Firm)
      },
      { path: 'organization-profile', title: 'Settings • Organization Profile',
        loadComponent: () => import('./sub-modules/organization-profile/organization-profile').then(m => m.OrganizationProfile)
      },
      { path: 'integration',         title: 'Settings • Integration',
        loadComponent: () => import('./sub-modules/integration/page/integration').then(m => m.Integration)
      },
      { path: 'security',            title: 'Settings • Security',
        loadComponent: () => import('./sub-modules/security/page/security').then(m => m.Security)
      },
    ]
  }
];
