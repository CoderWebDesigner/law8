import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityReportComponent } from './activity-report/activity-report.component';
import { MatterReportComponent } from './matter-report/matter-report.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';

const routes: Routes = [
  {path:'',loadComponent:()=>import('./activity-report/activity-report.component').then(comp=>ActivityReportComponent)},
  {path:'matter-report',loadComponent:()=>import('./matter-report/matter-report.component').then(comp=>MatterReportComponent)},
  {path:'timesheet-report',loadComponent:()=>import('./timesheet-report/timesheet-report.component').then(comp=>TimesheetReportComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
