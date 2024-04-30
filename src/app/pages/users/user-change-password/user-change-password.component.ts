import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent extends FormBaseClass implements OnInit{
  ngOnInit(): void {
    this.initForm()
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
        key:'userId',
        defaultValue:this._dynamicDialogConfig?.data?.userId
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
  override onSubmit(): void {
    delete this.formlyModel.confirmPassword
    this._apiService.post(API_Config.auth.changePassword,this.formlyModel).pipe(
      this._sharedService.takeUntilDistroy(),
    ).subscribe({
      next:(res:ApiRes)=>{
        if(res.isSuccess){
          this._toastrNotifiService.displaySuccessMessage(res.message);
          this._DialogService.dialogComponentRefMap.forEach((dialog) => {
            this._dynamicDialogRef.close(dialog);
          });
        }else{
          this._toastrNotifiService.displaySuccessMessage(res.message);
        }
      }
    })
  }

}
