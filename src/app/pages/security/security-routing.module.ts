import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';

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
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('./security-groups/security-groups.component').then(
            (x) => x.SecurityGroupsComponent
          ),
      },
      {
        path: 'timesheet',
        loadComponent: () =>
          import('./security-timesheet/security-timesheet.component').then(
            (x) => x.SecurityTimesheetComponent
          ),
      },
      {
        path: 'calender',
        loadComponent: () =>
          import('./security-calender/security-calender.component').then(
            (x) => x.SecurityCalenderComponent
          ),
      },
      {
        path: 'matter-access',
        loadComponent: () =>
          import('./security-matter-access/security-matter-access.component').then(
            (x) => x.SecurityMatterAccessComponent
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
