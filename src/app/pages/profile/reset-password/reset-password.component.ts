import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends FormBaseClass implements OnInit {
  
  ngOnInit(): void {
    this.initForm()
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.formlyModel =  {...changes['userInfo'].currentValue}
  //   this.initForm()
  // }
  // override initForm(): void {
  //   this.formlyFields = [
  //     // {
  //     //   key: 'email',
  //     //   type: 'input',
  //     //   defaultValue:this._authService.getDecodedToken()['Email'],
  //     //   props: {
  //     //     label: this._languageService.getTransValue(
  //     //       'common.email'
  //     //     ),
  //     //     required: true,
  //     //     disabled:true,
  //     //   },
  //     //   validators: {
  //     //     validation: ['email'],
  //     //   }
  //     // },
  //     {
  //       key: 'password',
  //       type: 'password',
  //       props: {
  //         label: this._languageService.getTransValue('common.password'),
  //         required: true
  //       },
  //       validators: {
  //         validation: ['password'],
  //       }
  //     },
  //     {
  //       key: 'confirmPassword',
  //       type: 'password',
  //       props: {
  //         label: this._languageService.getTransValue(
  //           'auth.confirmPassword'
  //         ),
  //         required: true
  //       },
  //       validators: {
  //         fieldMatch: {
  //           expression: (control) =>
  //             control.value === this.formlyModel.password,
  //           message: this._languageService.getTransValue(
  //             'validation.passwordNotMatching'
  //           ),
  //         },
  //       },
  //       expressionProperties: {
  //         'props.disabled': (model) => !this.formly.get('password')?.valid,
  //       },
  //     },
  //   ]
  // }
  // override onSubmit(): void {
  //   // console.log(this.userInfo);
  //   // if (this.formly.invalid) {
  //   //   this.formly.markAllAsTouched();
  //   //   return;
  //   // }
  //   // let body:User = {
  //   //   Email:this.formlyModel.email,
  //   //   Password:this.formlyModel.password
  //   // }
  //   // this.isLoading =true
  //   // this._apiService.put(API_Config.profile.update,body).pipe(
  //   //   finalize(()=> this.isLoading =false),
  //   //   this.takeUntilDestroy()
  //   // ).subscribe({
  //   //   next:(res:ApiRes)=>{
  //   //     if (res && !res.error) {
  //   //       const text = this._languageService.getTransValue('messages.updateSuccessfully');
  //   //       this._toastrNotifiService.displaySuccess(text);
  //         this.onEdit.emit(true)
  //   //     }
  //   //   }
  //   // })
  // }
  // ngOnInit(): void {
  //   this.initForm()
  // }
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
    this.formlyModel.userId=this._dynamicDialogConfig.data
  }
  override onSubmit(): void {
    delete this.formlyModel.confirmPassword
    this._apiService.post(API_Config.auth.changePassword,this.formlyModel).pipe(
      this._sharedService.takeUntilDistroy(),
    ).subscribe({
      next:(res:ApiRes)=>{
        if(res.isSuccess){
          this._dynamicDialogRef.close()
          this._toastrNotifiService.displaySuccessMessage(res.message);
          // this.onEdit.emit(true)
        }else{
          this._toastrNotifiService.displaySuccessMessage(res.message);
        }
      }
    })
  }

}
