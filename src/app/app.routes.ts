import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'repository',
        loadComponent: () => import('./features/dashboard/repository/repository').then(m => m.Repository)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/dashboard/reports/reports').then(m => m.Reports)
      },
      {
        path: 'library',
        loadComponent: () => import('./features/dashboard/library/library').then(m => m.Library)
      },
       {
        path: 'configuration',
        loadComponent: () => import('./features/dashboard/configuration/configuration').then(m => m.Configuration)
      },
 
      {
        path: 'settings',
        loadComponent: () => import('./features/dashboard/settings/settings').then(m => m.Settings)
      },
      {
        path: 'admin',
        loadComponent: () => import('./features/site-admin/pages/site-admin-page/site-admin-page').then(m => m.SiteAdminPage)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage)
  },
   { path: '', redirectTo: 'login', pathMatch: 'full' }




];
