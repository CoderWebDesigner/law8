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
import { MatterEditorAddressComponent } from './matter-editor/matter-editor-address/matter-editor-address.component';
import { MatterEditorContractsComponent } from './matter-editor/matter-editor-contracts/matter-editor-contracts.component';
import { MatterEditorPaymentTermsComponent } from './matter-editor/matter-editor-payment-terms/matter-editor-payment-terms.component';


@NgModule({
  declarations: [
    MattersComponent,
    MatterEditorComponent,
    MatterEditorGeneralComponent,
    MatterEditorAddressComponent,
    MatterEditorContractsComponent,
    MatterEditorPaymentTermsComponent
  ],
  imports: [
    CommonModule,
    MattersRoutingModule,
    SharedTableComponent,
    SharedCardComponent,
    SharedModule,
    SharedSearchInputComponent,
    FormlyConfigModule,
    TabViewModule
  ]
})
export class MattersModule { }
