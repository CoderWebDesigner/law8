import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bank-account',
    loadChildren: () =>
      import('./bank-account/bank-account.module').then(
        (mod) => mod.BankAccountModule
      ),
  },
  {
    path: 'gl-account',
    loadChildren: () =>
      import('./gl-account/gl-account.module').then(
        (mod) => mod.GlAccountModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
