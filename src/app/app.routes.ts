import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { SignIn } from './features/auth/pages/sign-in/sign-in';
import { ForgotPassword } from './features/auth/pages/forgot-password/forgot-password';
import { CheckIndbox } from './features/auth/pages/check-indbox/check-indbox';

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
        loadComponent: () => import('./features/dashboard/configuration/page/configuration').then(m => m.Configuration)
      },

      {
        path: 'settings',
        loadComponent: () => import('./features/dashboard/settings/settings-page/settings').then(m => m.Settings),

      },
      {
        path: 'admin',
        loadComponent: () => import('./features/site-admin/pages/site-admin-page/site-admin-page').then(m => m.SiteAdminPage),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'modules' }, 
          {
            path: 'modules',
            loadComponent: () =>
              import('./features/site-admin/sub-features/modules/pages/module-page/module-page')
                .then(m => m.ModulePage),
          },
          {
            path: 'sub-modules',
            loadComponent: () =>
              import('./features/site-admin/sub-features/sub-modules/pages/sub-module-page/sub-module-page')
                .then(m => m.SubModulePage),
          },
          {
            path: 'packages',
            loadComponent: () =>
              import('./features/site-admin/sub-features/packages/pages/packages-page/packages-page')
                .then(m => m.PackagesPage),
          },
          {
            path: 'organizations',
            loadComponent: () =>
              import('./features/site-admin/sub-features/organization/pages/organization-page/organization-page')
                .then(m => m.OrganizationPage),
          },
        ],
        
      },
      {
        path: 'view-profile',
        loadComponent: () => import('./shared/components/view-profile/view-profile').then(m => m.ViewProfile)
      }
    ]
  },
  {
    path: 'login',
    component: LoginPage,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignIn, title: 'Sign In' },
      { path: 'forgot-password', component: ForgotPassword, title: 'Forgot Password' },
      { path: 'reset-password', component: CheckIndbox, title: 'Reset Password' }
    ]

  },




];
