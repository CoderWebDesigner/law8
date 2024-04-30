import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-password-step-three',
  templateUrl: './new-password-step-three.component.html',
  styleUrls: ['./new-password-step-three.component.scss']
})
export class NewPasswordStepThreeComponent extends FormBaseClass implements OnInit {

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "newPassword",
        type: "password",
        props: {
          label: this._languageService.getTransValue("common.password"),
          required:true
        }
      },
      {
        key: "confirmPassword",
        type: "password",
        props: {
          label: this._languageService.getTransValue("auth.confirmPassword"),
          required:true,
        },
        validators: {
          fieldMatch: {
            expression: (control) =>
              control.value === this.formlyModel.newPassword,
            message: this._languageService.getTransValue(
              'validation.passwordNotMatching'
            ),
          },
        },
        expressionProperties: {
          'props.disabled': (model) => !this.formly.get('newPassword')?.valid,
        },
      },
    ]
  }


  onSubmit() {
    this.isSubmit = true;
    if (this.formly.invalid) return

    this._apiService.post(API_Config.auth.forgetPassword,{
      ...this._authService.user,
      newPassword:this.formlyModel.newPassword
    }).pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(()=>this.isSubmit=false)
    ).subscribe({
      next:(res:ApiRes)=>{
        if(res.isSuccess){
          this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
          this._router.navigate(['/auth/login'])
        }
      }
    })
    
    
    // if (this.checkRole()) {
    //   this.isSubmit = false
    //   this._storageService.setStorage('token', "token");
    //   this._storageService.setStorage('role', this.role);
    //   this._router.navigate(['/'])
    // }

  }


}
