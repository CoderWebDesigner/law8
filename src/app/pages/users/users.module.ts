import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedModule } from '@shared/shared.module';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { TooltipModule } from 'primeng/tooltip';
import { UsersTimesheetSettingComponent } from './users-timesheet-setting/users-timesheet-setting.component';
import { UserEditorDefaultRateComponent } from './user-editor/user-editor-default-rate/user-editor-default-rate.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    UsersComponent,
    UserEditorComponent,
    UserChangePasswordComponent,
    UsersTimesheetSettingComponent,
    UserEditorDefaultRateComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule,
    FormlyConfigModule,
    TooltipModule,
    TabViewModule
  ]
})
export class UsersModule { }
