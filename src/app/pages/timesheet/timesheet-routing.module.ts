import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetEditorComponent } from './components/timesheet-editor/timesheet-editor.component';

const routes: Routes = [
  {path:'',component:TimesheetComponent},
  {path:'add',component:TimesheetEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
