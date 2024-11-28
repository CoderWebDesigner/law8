import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlAccountRoutingModule } from './gl-account-routing.module';
import { GlAccountComponent } from './gl-account.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    GlAccountComponent
  ],
  imports: [
    CommonModule,
    GlAccountRoutingModule,
    SharedCardComponent,
    SharedModule,
    SharedTableComponent
  ]
})
export class GlAccountModule { }
