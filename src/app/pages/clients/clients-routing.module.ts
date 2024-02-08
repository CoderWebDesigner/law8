import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientIntakeComponent } from './components/client-intake/client-intake.component';

const routes: Routes = [
  {
    path:"",component:ClientsComponent,
  },
  {
    path:"view/:id",component:ClientDetailsComponent,
  },
  {
    path:"update/:id",component:ClientAddComponent,
  },
  {
    path:"add",component:ClientAddComponent,
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
