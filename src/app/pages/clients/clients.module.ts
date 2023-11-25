import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientIntakeComponent } from './components/client-intake/client-intake.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { TabViewModule } from 'primeng/tabview';
import { ClientDetailsAddressComponent } from './components/client-details/components/client-details-address/client-details-address.component';
import { ClientDetailsDocumentsComponent } from './components/client-details/components/client-details-documents/client-details-documents.component';
import { ClientDetailsContactsComponent } from './components/client-details/components/client-details-contacts/client-details-contacts.component';
import { ClientDetailsRelatedMattersComponent } from './components/client-details/components/client-details-related-matters/client-details-related-matters.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailsComponent,
    ClientIntakeComponent,
    ClientAddComponent,
    ClientDetailsAddressComponent,
    ClientDetailsDocumentsComponent,
    ClientDetailsContactsComponent,
    ClientDetailsRelatedMattersComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule,
    TabViewModule,
    FormlyConfigModule
  ]
})
export class ClientsModule { }
