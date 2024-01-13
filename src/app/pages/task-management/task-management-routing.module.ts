import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagementComponent } from './task-management.component';
import { TaskManagementEditorComponent } from './task-management-editor/task-management-editor.component';
import { TaskManagementCalenderComponent } from './task-management-calender/task-management-calender.component';

const routes: Routes = [
  {
    path:'',component:TaskManagementComponent
  } ,
  {
    path:'add',component:TaskManagementEditorComponent
  } ,
  {
    path:'update/:id',component:TaskManagementEditorComponent
  } ,
  {
    path:'calender',component:TaskManagementCalenderComponent
  } ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
