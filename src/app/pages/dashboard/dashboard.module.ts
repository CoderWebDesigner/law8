import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { DropdownModule } from 'primeng/dropdown';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedModule } from '@shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component:DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    MetricCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    DropdownModule,
    InlineSVGModule,
    SharedTableComponent,
    SharedCardComponent,
    SharedSearchInputComponent,
    SharedModule
  ]
})
export class DashboardModule { }
