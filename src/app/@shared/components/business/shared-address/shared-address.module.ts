import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedAddressComponent } from './shared-address.component';
import { SharedAddressEditorComponent } from './shared-address-editor/shared-address-editor.component';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';



@NgModule({
  declarations: [
    SharedAddressComponent,
    SharedAddressEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    FormlyConfigModule
  ]
})
export class SharedAddressModule { }
