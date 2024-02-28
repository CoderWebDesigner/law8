import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupsMatterCaterogyComponent } from './lookups-matter-caterogy/lookups-matter-caterogy.component';
import { LookupsMainListComponent } from './lookups-main-list/lookups-main-list.component';
import { LookupsRateTableComponent } from './lookups-rate-table/lookups-rate-table.component';
import { LookupsJurisdictionsComponent } from './lookups-jurisdictions/lookups-jurisdictions.component';

const routes: Routes = [
  {path:'matter-category', component:LookupsMatterCaterogyComponent},
  {path:'jurisdictions', component:LookupsJurisdictionsComponent},
  {path:'rate', component:LookupsRateTableComponent},
  {path:'main-list', component:LookupsMainListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
