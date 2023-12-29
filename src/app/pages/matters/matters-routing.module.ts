import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MattersComponent } from './matters.component';
import { MatterEditorComponent } from './matter-editor/matter-editor.component';
import { MatterDetailsComponent } from './matter-details/matter-details.component';

const routes: Routes = [
  {path:'',component:MattersComponent},
  {path:'add',component:MatterEditorComponent},
  {path:'update/:id',component:MatterEditorComponent},
  {
    path:"view/:id",component:MatterDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MattersRoutingModule { }
