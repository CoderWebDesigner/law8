import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { permissionGuard } from '@core/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadComponent: () =>
          import('./security-users/security-users.component').then(
            (x) => x.SecurityUsersComponent
          ),
        canActivate: [permissionGuard],
        data: { permission: 'View_Security_Users' },
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('./security-groups/security-groups.component').then(
            (x) => x.SecurityGroupsComponent
          ),
        canActivate: [permissionGuard],
        data: { permission: 'View_Security_Groups' },
      },
      {
        path: 'timesheet',
        loadComponent: () =>
          import('./security-timesheet/security-timesheet.component').then(
            (x) => x.SecurityTimesheetComponent
          ),
        canActivate: [permissionGuard],
        data: { permission: 'View_Security_Timesheet' },
      },
      {
        path: 'calender',
        loadComponent: () =>
          import('./security-calender/security-calender.component').then(
            (x) => x.SecurityCalenderComponent
          ),
        canActivate: [permissionGuard],
        data: { permission: 'View_Security_Calendar' },
      },
      {
        path: 'matter-access',
        loadComponent: () =>
          import(
            './security-matter-access/security-matter-access.component'
          ).then((x) => x.SecurityMatterAccessComponent),
        canActivate: [permissionGuard],
        data: { permission: 'View_Security_MatterAccess' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
