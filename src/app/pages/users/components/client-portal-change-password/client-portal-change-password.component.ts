import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-client-portal-change-password',
  templateUrl: './client-portal-change-password.component.html',
  styleUrls: ['./client-portal-change-password.component.scss'],
  standalone:true,
  imports:[FormlyConfigModule,SharedModule]
})
export class ClientPortalChangePasswordComponent extends FormBaseClass implements OnInit{
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
        key:'id',
        defaultValue:this._dynamicDialogConfig?.data?.id
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
    this._apiService.post(API_Config.clientPortal.changePassword,this.formlyModel).pipe(
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
