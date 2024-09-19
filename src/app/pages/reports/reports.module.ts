import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
import { TimesheetReportEditorComponent } from './timesheet-report/timesheet-report-editor/timesheet-report-editor.component';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
