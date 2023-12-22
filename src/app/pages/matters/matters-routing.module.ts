import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MattersComponent } from './matters.component';
import { MatterEditorComponent } from './matter-editor/matter-editor.component';

const routes: Routes = [
  {path:'',component:MattersComponent},
  {path:'add',component:MatterEditorComponent},
  {path:'update/:id',component:MatterEditorComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MattersRoutingModule { }
