import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupsMatterCaterogyComponent } from './lookups-matter-caterogy/lookups-matter-caterogy.component';
import { LookupsMainListComponent } from './lookups-main-list/lookups-main-list.component';
import { LookupsRateTableComponent } from './lookups-rate-table/lookups-rate-table.component';
import { LookupsJurisdictionsComponent } from './lookups-jurisdictions/lookups-jurisdictions.component';
import { permissionGuard } from '@core/guards/permission.guard';

const routes: Routes = [
  {
    path: 'matter-category',
    component: LookupsMatterCaterogyComponent,
    canActivate: [permissionGuard],
    data: { permission: 'View_MatterCategory' },
  },
  {
    path: 'jurisdictions',
    component: LookupsJurisdictionsComponent,
    canActivate: [permissionGuard],
    data: { permission: 'View_Jurisdiction' },
  },
  {
    path: 'rate',
    component: LookupsRateTableComponent,
    canActivate: [permissionGuard],
    data: { permission: 'View_RateType' },
  },
  {
    path: 'main-list',
    component: LookupsMainListComponent,
    canActivate: [permissionGuard],
    data: {
      permission:
        'View_MatterStatus' ||
        'View_Stage' ||
        'View_ClientGroup' ||
        'View_ReferralType' ||
        'View_PartiesDescription' ||
        'View_AdjournmentReasons' ||
        'View_TaskCode' ||
        'View_PractsArea' ||
        'View_Department' ||
        'View_Industry',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
