import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'expenses',loadChildren:()=>import('./billing-expenses/billing-expenses.module').then(mod=>mod.BillingExpensesModule)},
  {path:'bill',loadChildren:()=>import('./bill/bill.module').then(mod=>mod.BillModule)},
  {path:'pre-bill',loadChildren:()=>import('./pre-bill/pre-bill.module').then(mod=>mod.PreBillModule)},
  {path:'',redirectTo:'expenses',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
