import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountRoutingModule } from './bank-account-routing.module';
import { BankAccountComponent } from './bank-account.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';

@NgModule({
  declarations: [
    BankAccountComponent
  ],
  imports: [
    CommonModule,
    BankAccountRoutingModule,
    SharedCardComponent,
    SharedModule,
    SharedTableComponent
  ]
})
export class BankAccountModule { }
