import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientEditorComponent } from './components/client-editor/client-editor.component';
import { ClientIntakeComponent } from './components/client-intake/client-intake.component';

const routes: Routes = [
  {
    path:"",component:ClientsComponent,

  },
  // {
  //   path:"view/:id",component:ClientDetailsComponent,
    
  // },
  {
    path:"view/:id",component:ClientEditorComponent,
  },
  {
    path:"update/:id",component:ClientEditorComponent,
  },
  {
    path:"add",component:ClientEditorComponent,
  },
  {
    path:"intake",component:ClientIntakeComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
