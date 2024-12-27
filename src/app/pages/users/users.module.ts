import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedModule } from '@shared/shared.module';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    // ClientPortalChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule,
    FormlyConfigModule,
    TooltipModule,
    TabViewModule
  ]
})
export class UsersModule { }
