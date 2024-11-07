import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingExpensesComponent } from './billing-expenses.component';

const routes: Routes = [
  {path:'',component:BillingExpensesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
