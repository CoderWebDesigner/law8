import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'expenses',loadChildren:()=>import('./billing-expenses/billing-expenses.module').then(mod=>mod.BillingExpensesModule)},
  {path:'',redirectTo:'expenses',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
