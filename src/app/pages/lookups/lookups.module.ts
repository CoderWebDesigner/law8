import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { LookupsComponent } from './lookups.component';
import { MatterCaterogyComponent } from './matter-caterogy/matter-caterogy.component';
import { MainListComponent } from './main-list/main-list.component';


@NgModule({
  declarations: [
    LookupsComponent,
    MatterCaterogyComponent,
    MainListComponent
  ],
  imports: [
    CommonModule,
    LookupsRoutingModule
  ]
})
export class LookupsModule { }
