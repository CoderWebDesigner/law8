import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MattersRoutingModule } from './matters-routing.module';
import { MattersComponent } from './matters.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { MatterEditorComponent } from './matter-editor/matter-editor.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { TabViewModule } from 'primeng/tabview';
import { MatterEditorGeneralComponent } from './matter-editor/matter-editor-general/matter-editor-general.component';
import { MatterEditorContactsComponent } from './matter-editor/matter-editor-contacts/matter-editor-contacts.component';
import { MatterEditorPaymentTermsComponent } from './matter-editor/matter-editor-payment-terms/matter-editor-payment-terms.component';
import { SharedMatterTableComponent } from '@shared/components/business/shared-matter-table/shared-matter-table.component';
import { MatterDetailsComponent } from './matter-details/matter-details.component';
import { SharedAddressModule } from '@shared/components/business/shared-address/shared-address.module';
import { MatterDetailsMainInfoComponent } from './matter-details/matter-details-main-info/matter-details-main-info.component';
import { MatterDetailsTimesheetComponent } from './matter-details/matter-details-timesheet/matter-details-timesheet.component';
import { MatterDetailsRelatedMattersComponent } from './matter-details/matter-details-related-matters/matter-details-related-matters.component';
import { MatterDetailsDocumentsComponent } from './matter-details/matter-details-documents/matter-details-documents.component';
import { MatterDetailsDocumentsEditorComponent } from './matter-details/matter-details-documents/matter-details-documents-editor/matter-details-documents-editor.component';
import { MatterDetailsActivityComponent } from './matter-details/matter-details-activity/matter-details-activity.component';
import { MatterDetailsActivityEditorComponent } from './matter-details/matter-details-activity/matter-details-activity-editor/matter-details-activity-editor.component';
import { MatterDetailsGeneralComponent } from './matter-details/matter-details-general/matter-details-general.component';
import { MatterDetailsBillingSettingsComponent } from './matter-details/matter-details-billing-settings/matter-details-billing-settings.component';
import { MatterDetailsInvoiceComponent } from './matter-details/matter-details-invoice/matter-details-invoice.component';
import { MatterDetailsInvoiceEditorComponent } from './matter-details/matter-details-invoice/matter-details-invoice-editor/matter-details-invoice-editor.component';
import { MatterDetailsInvoiceSalesItemsComponent } from './matter-details/matter-details-invoice/matter-details-invoice-editor/matter-details-invoice-sales-items/matter-details-invoice-sales-items.component';
import { MatterDetailsInvoiceSalesEditorComponent } from './matter-details/matter-details-invoice/matter-details-invoice-editor/matter-details-invoice-sales-items/matter-details-invoice-sales-editor/matter-details-invoice-sales-editor.component';
import { MatterEditorPartiesComponent } from './matter-editor/matter-editor-parties/matter-editor-parties.component';
import { MatterApplicantsComponent } from './components/matter-applicants/matter-applicants.component';
import { MatterClassComponent } from './components/matter-class/matter-class.component';
import { MatterSelectClassComponent } from './components/matter-class/matter-select-class/matter-select-class.component';
import { MatterAddressComponent } from './components/matter-address/matter-address.component';
import { MatterPartyComponent } from './components/matter-party/matter-party.component';


@NgModule({
  declarations: [
    MatterAddressComponent,
    MattersComponent,
    MatterEditorComponent,
    MatterEditorGeneralComponent,
    MatterEditorContactsComponent,
    MatterEditorPaymentTermsComponent,
    MatterEditorPartiesComponent,
    MatterDetailsComponent,
    MatterDetailsMainInfoComponent,
    MatterDetailsTimesheetComponent,
    MatterDetailsRelatedMattersComponent,
    MatterDetailsDocumentsComponent,
    MatterDetailsDocumentsEditorComponent,
    MatterDetailsActivityComponent,
    MatterDetailsActivityEditorComponent,
    MatterDetailsGeneralComponent,
    MatterDetailsBillingSettingsComponent,
    MatterDetailsInvoiceComponent,
    MatterDetailsInvoiceEditorComponent,
    MatterDetailsInvoiceSalesItemsComponent,
    MatterDetailsInvoiceSalesEditorComponent,
    MatterApplicantsComponent,
    MatterClassComponent,
    MatterSelectClassComponent,
    MatterPartyComponent
  ],
  imports: [
    CommonModule,
    MattersRoutingModule,
    SharedTableComponent,
    SharedCardComponent,
    SharedModule,
    SharedSearchInputComponent,
    FormlyConfigModule,
    TabViewModule,
    SharedMatterTableComponent,
    SharedAddressModule
  ]
})
export class MattersModule { }
