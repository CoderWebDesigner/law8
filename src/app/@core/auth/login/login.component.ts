import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { API_Config } from '@core/api/api-config/api.config';
import { finalize } from 'rxjs';
import { StorageService } from '@core/services';
import { ApiRes } from '@core/models';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseClass implements OnInit {
  apiURL = API_Config.auth;
  _storageService = inject(StorageService);
  
 
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "userName",
        type: "input",
        props: {
          label: this._languageService.getTransValue("auth.username"),
          placeholder: this._languageService.getTransValue("auth.userNamePlaceholder"),
          icon: "pi pi-user",
          required:true
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
          required:true,
          feedback:false
        }
      },
      {
        fieldGroupClassName: "d-flex justify-content-between align-items-center",
        fieldGroup: [
          // {
          //   key: "RememberMe",
          //   type: "checkbox",
          //   props: {
          //     label: this._languageService.getTransValue("auth.rememberMe"),
          //   }
          // },
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

    if (this.formly.valid) {
      this.isSubmit = true;

      this._apiService.post(this.apiURL.login,this.formlyModel).pipe(
        finalize(() => this.isSubmit = false),
        this._sharedService.takeUntilDistroy()
      ).subscribe({
        next: (res:ApiRes) => {
          if(res.isSuccess){
  
            this._authService.setUser({userName:this.formlyModel.userName})
            this._router.navigate(['/auth/otp'])
          }
        },
        error:err=>{
          this._toastrNotifiService.displayErrorToastr(this._languageService.getTransValue('messages.signInError'));
        }
      })
    } else {
      return;
    }

  }

}
