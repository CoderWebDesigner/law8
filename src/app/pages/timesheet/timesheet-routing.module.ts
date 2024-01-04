import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetFormlyEditorComponent } from './components/timesheet-formly-editor/timesheet-formly-editor.component';

const routes: Routes = [
  {path:'',component:TimesheetComponent},
  {path:'add',component:TimesheetFormlyEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
