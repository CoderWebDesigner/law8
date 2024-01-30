import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupsMatterCaterogyComponent } from './lookups-matter-caterogy/lookups-matter-caterogy.component';
import { LookupsMainListComponent } from './lookups-main-list/lookups-main-list.component';

const routes: Routes = [
  {path:'matter-category', component:LookupsMatterCaterogyComponent},
  {path:'matter-regions', component:LookupsMatterCaterogyComponent},
  {path:'main-list', component:LookupsMainListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
