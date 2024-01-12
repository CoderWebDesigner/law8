import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then((m) => m.ClientsModule)
  },
  {
    path: 'timesheet',
    loadChildren: () => import('./timesheet/timesheet.module').then((m) => m.TimesheetModule)
  },
  {
    path: 'matters',
    loadChildren: () => import('./matters/matters.module').then((m) => m.MattersModule)
  },
  {
    path: 'task-management',
    loadChildren: () => import('./task-management/task-management.module').then((m) => m.TaskManagementModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule)
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
