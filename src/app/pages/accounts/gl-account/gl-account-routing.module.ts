import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlAccountComponent } from './gl-account.component';

const routes: Routes = [
  {path:'',component:GlAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlAccountRoutingModule { }
