import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('@core/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },

];


const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
