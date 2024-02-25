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
import { ClientEditorComponent } from './components/client-editor/client-editor.component';
import { TabViewModule } from 'primeng/tabview';
import { ClientDetailsAddressComponent } from './components/client-details/components/client-details-address/client-details-address.component';
import { ClientDetailsDocumentsComponent } from './components/client-details/components/client-details-documents/client-details-documents.component';
import { ClientDetailsContactsComponent } from './components/client-details/components/client-details-contacts/client-details-contacts.component';
import { ClientDetailsRelatedMattersComponent } from './components/client-details/components/client-details-related-matters/client-details-related-matters.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { ClientAddCompanyAddressComponent } from './components/client-editor/components/client-add-company-address/client-add-company-address.component';
import { ClientAddressEditorComponent } from './components/client-editor/components/client-add-billing-address/client-address-editor/client-address-editor.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ClientAddBillingAddressComponent } from './components/client-editor/components/client-add-billing-address/client-add-billing-address.component';
import { ClientContactsComponent } from './components/client-editor/components/client-contacts/client-contacts.component';
@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailsComponent,
    ClientIntakeComponent,
    ClientEditorComponent,
    ClientDetailsAddressComponent,
    ClientDetailsDocumentsComponent,
    ClientDetailsContactsComponent,
    ClientDetailsRelatedMattersComponent,
    ClientAddCompanyAddressComponent,
    ClientAddressEditorComponent,
    ClientAddBillingAddressComponent,
    ClientContactsComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule,
    TabViewModule,
    FormlyConfigModule,
    DynamicDialogModule
  ],
})
export class ClientsModule { }
