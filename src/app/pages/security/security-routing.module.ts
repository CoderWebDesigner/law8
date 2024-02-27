import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';

const routes: Routes = [
  {
    path: '', component: SecurityComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users', loadComponent: () =>
          import('./security-users/security-users.component').then((x) => x.SecurityUsersComponent),
      },
      {
        path: 'groups', loadComponent: () =>
          import('./security-groups/security-groups.component').then((x) => x.SecurityGroupsComponent),
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
