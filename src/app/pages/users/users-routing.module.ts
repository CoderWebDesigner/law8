import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', loadChildren:()=>import('./user/users.route').then(mod=>mod.USERS_ROUTES) },
  { path: 'client-portal', loadChildren:()=>import('./client-portal/client-portal.route').then(mod=>mod.CLIENT_PORTAL_ROUTES) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
