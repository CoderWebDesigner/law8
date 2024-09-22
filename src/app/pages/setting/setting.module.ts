import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';


@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormlyConfigModule,
    SharedModule,
    SharedCardComponent
  ]
})
export class SettingModule { }
