import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { TaskManagementComponent } from './task-management.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedModule } from '@shared/shared.module';
import { TaskManagementEditorComponent } from './task-management-editor/task-management-editor.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { TaskManagementCalenderComponent } from './task-management-calender/task-management-calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    TaskManagementComponent,
    TaskManagementEditorComponent,
    TaskManagementCalenderComponent
  ],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule,
    FullCalendarModule,
    FormlyConfigModule
  ]
})
export class TaskManagementModule { }
