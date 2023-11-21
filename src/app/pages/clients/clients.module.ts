import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { ClientIntakeComponent } from './components/client-intake/client-intake.component';


@NgModule({
  declarations: [
    ClientsComponent,
    DetailsComponent,
    ClientIntakeComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedModule
  ]
})
export class ClientsModule { }
