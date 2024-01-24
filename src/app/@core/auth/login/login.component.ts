import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { API_Config } from '@core/api/api-config/api.config';
import { finalize } from 'rxjs';
import { StorageService } from '@core/services';
import { ApiRes, Login } from '@core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseClass implements OnInit {
  apiURL = API_Config.auth;
  _storageService = inject(StorageService)
  // loginData = new Login()
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "employeeId",
        type: "input",
        props: {
          label: this._languageService.getTransValue("common.username"),
          placeholder: this._languageService.getTransValue("auth.userNamePlaceholder"),
          icon: "pi pi-user",
          required: true
        }
      },
      {
        key: "password",
        type: "input",
        props: {
          type: "password",
          label: this._languageService.getTransValue("common.password"),
          placeholder: this._languageService.getTransValue("auth.passwordPlaceholder"),
          icon: "pi pi-lock",
          required: true
        }
      },
      {
        fieldGroupClassName: "d-flex justify-content-between align-items-center",
        fieldGroup: [
          {
            key: "RememberMe",
            type: "checkbox",
            props: {
              label: this._languageService.getTransValue("auth.rememberMe"),
            }
          },
          {
            type: "button",
            props: {
              label: this._languageService.getTransValue("auth.forgetPassword"),
              class: " p-button-text p-0",
              onClick: () => {
                this._DialogService.open(ForgetpasswordComponent, {
                  width: '50%',
                  dismissableMask: true,
                })
              }
            }
          }
        ]
      }
    ]
  }


  onSubmit() {
    if (this.formly.invalid) return
    this.isSubmit = true;
    this._apiService.post(this.apiURL.login, this.formlyModel).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: (res:ApiRes) => {
        if(res && res.Success){
          // this._storageService.setStorage('token', res.Data['token']);
          // this._storageService.setStorage('empolyeeId', res.Data['Initial']);
          this._authService.setUser(res.Data['Name'])
          this._router.navigate(['/auth/otp'])
        }
      },
      // error: err => {
      //   this._toastrNotifiService.displayErrorToastr(this._languageService.getTransValue('messages.signInError'));
      // }
    })


  }

}
