import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedCardComponent,
    SharedModule,
    SharedSearchInputComponent,
    SharedTableComponent
  ]
})
export class SearchModule { }
