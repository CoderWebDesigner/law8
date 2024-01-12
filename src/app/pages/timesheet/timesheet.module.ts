import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetFormlyEditorComponent } from './components/timesheet-formly-editor/timesheet-formly-editor.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedModule } from '@shared/shared.module';
import { StopWatchComponent } from './components/stop-watch/stop-watch.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MattersComponent } from './components/matters/matters.component';
import { TimesheetEditorComponent } from './components/timesheet-editor/timesheet-editor.component';
@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetFormlyEditorComponent,
    StopWatchComponent,
    MattersComponent,
    TimesheetEditorComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule,
    FormlyConfigModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputTextareaModule,
    ReactiveFormsModule
  ]
})
export class TimesheetModule { }
