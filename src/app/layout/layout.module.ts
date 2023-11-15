import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AppUserComponent } from './topbar/app-user/app-user.component';
import { MenuModule } from 'primeng/menu';
import { AppLanguageComponent } from './topbar/app-language/app-language.component';
import { SharedModule } from '@shared/shared.module';

const components = [
  LayoutComponent,
];

@NgModule({
  declarations: [
    SidebarComponent,
    ...components,
    TopbarComponent,
    AppUserComponent,
    AppLanguageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SimplebarAngularModule,
    MenuModule,
    SharedModule
  ],
  exports:[
    ...components
  ]
})
export class LayoutModule { }
