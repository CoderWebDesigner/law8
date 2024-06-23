import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MattersComponent } from './matters.component';
import { MatterEditorComponent } from './matter-editor/matter-editor.component';
import { MatterDetailsComponent } from './matter-details/matter-details.component';
import { MattersInactiveComponent } from './matters-inactive/matters-inactive.component';

const routes: Routes = [
  { path: '', component: MattersComponent },
  { path: 'inactive', component: MattersInactiveComponent },
  { path: 'add', component: MatterEditorComponent },
  // { path: 'update/:id', component: MatterEditorComponent },
  { path: 'update/:id', component: MatterDetailsComponent },
  {
    path: 'view/:id',
    component: MatterDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MattersRoutingModule {}
