import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionGuard } from '@core/guards/permission.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    // canActivate: [permissionGuard],
    // data: { permission: 'Add_Client' },
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientsModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Client' },
  },
  {
    path: 'timesheet',
    loadChildren: () =>
      import('./timesheet/timesheet.module').then((m) => m.TimesheetModule),
    canActivate: [permissionGuard],
    data: { permission: 'Add_Client' },
  },
  {
    path: 'matters',
    loadChildren: () =>
      import('./matters/matters.module').then((m) => m.MattersModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Matter' },
  },
  {
    path: 'task-management',
    loadChildren: () =>
      import('./task-management/task-management.module').then(
        (m) => m.TaskManagementModule
      ),
    canActivate: [permissionGuard],
    data: { permission: 'Add_Client' },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [permissionGuard],
    data: { permission: 'View_Users' },
  },
  {
    path: 'lookups',
    loadChildren: () =>
      import('./lookups/lookups.module').then((m) => m.LookupsModule),
    canActivate: [permissionGuard],
    data: { permission: 'Add_Client' },
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityModule),
    canActivate: [permissionGuard],
    data: { permission: 'Add_Client' },
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [permissionGuard],
    data: { permission: 'Add_Client' },
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
