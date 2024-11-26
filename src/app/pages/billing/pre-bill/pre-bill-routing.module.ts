import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreBillComponent } from './pre-bill.component';

const routes: Routes = [
  {path:'',component:PreBillComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreBillRoutingModule { }
