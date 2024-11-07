import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './billing-expenses-routing.module';
import { BillingExpensesComponent } from './billing-expenses.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    BillingExpensesComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    SharedTableComponent,
    SharedCardComponent,
    SharedModule
  ]
})
export class BillingExpensesModule { }
