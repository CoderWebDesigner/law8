import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { StepsModule } from 'primeng/steps';
import { OtpComponent } from './otp/otp.component';
import { UserIdStepOneComponent } from './forgetpassword/user-id-step-one/user-id-step-one.component';
import { VerfiyStepTwoComponent } from './forgetpassword/verfiy-step-two/verfiy-step-two.component';
import { NewPasswordStepThreeComponent } from './forgetpassword/new-password-step-three/new-password-step-three.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent,  children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'otp', component: OtpComponent },
    ]
  }
];


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgetpasswordComponent,
    OtpComponent,
    UserIdStepOneComponent,
    VerfiyStepTwoComponent,
    NewPasswordStepThreeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormlyConfigModule,
    StepsModule
  ]
})
export class AuthModule { }
