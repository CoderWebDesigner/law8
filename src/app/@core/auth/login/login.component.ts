import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseClass implements OnInit {

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "username",
        type: "input",
        props: {
          label: this._languageService.getTransValue("auth.username"),
          placeholder: this._languageService.getTransValue("auth.userNamePlaceholder"),
          icon: "pi pi-user",
        }
      },
      {
        key: "password",
        type: "input",
        props: {
          type: "password",
          label: this._languageService.getTransValue("auth.password"),
          placeholder: this._languageService.getTransValue("auth.passwordPlaceholder"),
          icon: "pi pi-lock",
        }
      },
      {
        fieldGroupClassName: "d-flex justify-content-between align-items-center",
        fieldGroup: [
          {
            key: "rememberMe",
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
                  width: '50%'
                })
              }
            }
          }
        ]
      }
    ]
  }


  onSubmit() {
    this.isSubmit = true;
    if (this.formly.invalid) {
      this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
      return;
    }
    this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
    this._router.navigate(['/auth/otp'])
    // if (this.checkRole()) {
    //   this.isSubmit = false
    //   this._storageService.setStorage('token', "token");
    //   this._storageService.setStorage('role', this.role);
    //   this._router.navigate(['/'])
    // }

  }

}
