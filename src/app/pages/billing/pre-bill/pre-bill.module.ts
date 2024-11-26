import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreBillRoutingModule } from './pre-bill-routing.module';
import { PreBillComponent } from './pre-bill.component';
import { PreBillExpensesComponent } from './pre-bill-expenses/pre-bill-expenses.component';
import { PreBillInfoComponent } from './pre-bill-info/pre-bill-info.component';
import { PreBillSummaryComponent } from './pre-bill-summary/pre-bill-summary.component';
import { PreBillTimeFeesComponent } from './pre-bill-time-fees/pre-bill-time-fees.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    PreBillComponent,
    PreBillExpensesComponent,
    PreBillInfoComponent,
    PreBillSummaryComponent,
    PreBillTimeFeesComponent
  ],
  imports: [
    CommonModule,
    PreBillRoutingModule,
    SharedCardComponent,
    FormlyConfigModule,
    SharedModule,
    AccordionModule,
    SharedTableComponent
  ]
})
export class PreBillModule { }
