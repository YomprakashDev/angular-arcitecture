import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
// import { AuthService } from '../../auth/data-access/auth.service';

// const adminGuard = () => {
//   const auth = inject(AuthService);
//   return auth.isAdmin() ? true : inject(Router).createUrlTree(['/login']);
// };

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        title: 'Admin',
        loadComponent: () => import('./page/site-admin-page').then(m => m.SiteAdminPage),
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'modules' },

            {
                path: 'modules', title: 'Admin • Modules',
                loadComponent: () => import('./sub-features/modules/page/module-page').then(m => m.ModulePage)
            },

            {
                path: 'sub-modules', title: 'Admin • Sub-Modules',
                loadComponent: () => import('./sub-features/sub-modules/page/sub-module-page').then(m => m.SubModulePage)
            },

            {
                path: 'packages', title: 'Admin • Packages',
                loadComponent: () => import('./sub-features/packages/page/packages-page').then(m => m.PackagesPage)
            },
            {
                path: 'organizations', title: 'Admin • Organizations',
                loadComponent: () => import('./sub-features/organization/page/organization-page').then(m => m.OrganizationPage)
            },
        ]
    }
];
