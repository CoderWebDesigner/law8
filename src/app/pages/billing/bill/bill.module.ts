import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './bill.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { BillInfoComponent } from './bill-info/bill-info.component';
import { BillTimeFeesComponent } from './bill-time-fees/bill-time-fees.component';
import { BillExpensesComponent } from './bill-expenses/bill-expenses.component';
import { BillSummaryComponent } from './bill-summary/bill-summary.component';
import { AccordionModule } from 'primeng/accordion';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';

@NgModule({
  declarations: [BillComponent, BillInfoComponent, BillTimeFeesComponent, BillExpensesComponent, BillSummaryComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    SharedCardComponent,
    FormlyConfigModule,
    SharedModule,
    AccordionModule,
    SharedTableComponent
  ]
})
export class BillModule { }
