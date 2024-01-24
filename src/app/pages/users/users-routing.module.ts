import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserEditorComponent } from './user-editor/user-editor.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add', component: UserEditorComponent },
  { path: 'update/:id', component: UserEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
