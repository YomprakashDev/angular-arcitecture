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
        loadComponent: () => import('./features/repository/repository').then(m => m.Repository)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports').then(m => m.Reports)
      },
      {
        path: 'library',
        loadComponent: () => import('./features/library/library').then(m => m.Library)
      },
      {
        path: 'configuration',
        loadComponent: () => import('./features/configuration/page/configuration').then(m => m.Configuration)
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
      },
      {
        path: 'admin',
        loadChildren: () => import('./features/site-admin/site-admin.routes').then(m => m.ADMIN_ROUTES)
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
