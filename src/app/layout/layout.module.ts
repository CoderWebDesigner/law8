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
import { BreadcrumbComponent as customBreadCrumb } from './breadcrumb/breadcrumb.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { AppUserComponent } from './topbar/app-user/app-user.component';
import { AppSettingsComponent } from './topbar/app-settings/app-settings.component';
import { AppSearchComponent } from './topbar/app-search/app-search.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppNotificationComponent } from './topbar/app-notification/app-notification.component';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

const components = [
  LayoutComponent,
];

@NgModule({
  declarations: [
    ...components,
    SidebarComponent,
    TopbarComponent,
    AppLanguageComponent,
    customBreadCrumb,
    AppSearchComponent,
    AppNotificationComponent,
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
    BreadcrumbComponent,
    AppUserComponent,
    AppSettingsComponent,
    ListboxModule,
    OverlayPanelModule,
    ScrollPanelModule,
    ButtonModule,
    BadgeModule
  ],
  exports:[
    ...components
  ],

})
export class LayoutModule { }
