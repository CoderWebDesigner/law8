import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionGuard } from '@core/guards/permission.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { breadcrumb: 'menu.dashboard' },
    // canActivate: [permissionGuard],
    //  data: { permission: 'dashboard' },
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientsModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Client',breadcrumb: 'menu.clients.title' },
  },
  {
    path: 'timesheet',
    loadChildren: () =>
      import('./timesheet/timesheet.module').then((m) => m.TimesheetModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Timesheet',breadcrumb: 'menu.timesheet.title' },
  },
  {
    path: 'matters',
    loadChildren: () =>
      import('./matters/matters.module').then((m) => m.MattersModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Matter',breadcrumb: 'menu.matters.title' },
  },
  {
    path: 'task-management',
    loadChildren: () =>
      import('./task-management/task-management.module').then(
        (m) => m.TaskManagementModule
      ),
    canActivate: [permissionGuard],
    data: { permission: 'Calender',breadcrumb: 'menu.taskManagement.title' },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Users',breadcrumb: 'menu.users.title' },
  },
  {
    path: 'lookups',
    loadChildren: () =>
      import('./lookups/lookups.module').then((m) => m.LookupsModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Loockup',breadcrumb: 'menu.lookups.title' },
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Security',breadcrumb: 'menu.security.title' },
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Report',breadcrumb: 'menu.reports.title' },
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
    
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
