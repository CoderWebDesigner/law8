import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TopbarComponent } from './topbar/topbar.component';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { AppLanguageComponent } from './topbar/app-language/app-language.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AppUserComponent } from './topbar/app-user/app-user.component';
import { AppSettingsComponent } from './topbar/app-settings/app-settings.component';

const components = [
  LayoutComponent,
];

@NgModule({
  declarations: [
    ...components,
    SidebarComponent,
    TopbarComponent,
    AppLanguageComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SimplebarAngularModule,
    InlineSVGModule,
    FormsModule,
    MenuModule,
    DropdownModule,
    BreadcrumbModule,
    AppUserComponent,
    AppSettingsComponent,
  ],
  exports:[
    ...components
  ],
 
})
export class LayoutModule { }
