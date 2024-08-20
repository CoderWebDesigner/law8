import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MattersComponent } from './matters.component';
import { MatterEditorComponent } from './matter-editor/matter-editor.component';
import { MatterDetailsComponent } from './matter-details/matter-details.component';
import { MattersInactiveComponent } from './matters-inactive/matters-inactive.component';

const routes: Routes = [
  {path:'',redirectTo:'list',pathMatch:'full'},
  { path: 'list', component: MattersComponent,data:{breadcrumb: 'menu.matters.matterList'} },
  { path: 'inactive', component: MattersInactiveComponent,data:{breadcrumb: 'menu.matters.inactiveMatters'} },
  { path: 'add', component: MatterEditorComponent ,data:{breadcrumb: 'menu.matters.matterAdd'}},
  // { path: 'update/:id', component: MatterEditorComponent },
  { path: 'update/:id', component: MatterDetailsComponent },
  {
    path: 'list/view/:id',
    component: MatterDetailsComponent,
  },
  {
    path: 'inactive/view/:id',
    component: MatterDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MattersRoutingModule {}
