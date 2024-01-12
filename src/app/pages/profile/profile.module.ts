import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';
import { OverviewComponent } from './overview/overview.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';

@NgModule({
  declarations: [
    ProfileComponent,
    OverviewComponent,
    EditProfileComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedCardComponent,
    SharedModule,
    TabViewModule,
    ProgressBarModule,
    FormlyConfigModule
  ]
})
export class ProfileModule { }
