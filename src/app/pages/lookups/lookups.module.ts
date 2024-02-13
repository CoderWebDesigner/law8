import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { LookupsMatterCaterogyComponent } from './lookups-matter-caterogy/lookups-matter-caterogy.component';
import { LookupsMainListComponent } from './lookups-main-list/lookups-main-list.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { LookupsJurisdictionsComponent } from './lookups-jurisdictions/lookups-jurisdictions.component';
import { LookupsRateTableComponent } from './lookups-rate-table/lookups-rate-table.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    LookupsMatterCaterogyComponent,
    LookupsMainListComponent,
    LookupsJurisdictionsComponent,
    LookupsRateTableComponent
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule,
    TableModule,
    SharedModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    
  ]
})
export class LookupsModule { }
