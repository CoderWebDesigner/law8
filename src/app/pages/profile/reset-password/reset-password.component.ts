import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { User } from '@core/models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends FormBaseClass implements OnChanges {
  @Output() onEdit = new EventEmitter<boolean>()
  @Input({required:true}) userInfo:User;
  ngOnChanges(changes: SimpleChanges): void {
    this.formlyModel =  {...changes['userInfo'].currentValue}
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        key: 'email',
        type: 'input',
        props: {
          label: this._languageService.getTransValue(
            'profile.email'
          ),
          required: true,
          disabled:true,
        },
        validators: {
          validation: ['email'],
        }
      },
      {
        key: 'password',
        type: 'password',
        props: {
          label: this._languageService.getTransValue('auth.password'),
          required: true
        },
        validators: {
          validation: ['password'],
        }
      },
      {
        key: 'confirmPassword',
        type: 'password',
        props: {
          label: this._languageService.getTransValue(
            'auth.confirmPassword'
          ),
          required: true
        },
        validators: {
          fieldMatch: {
            expression: (control) =>
              control.value === this.formlyModel.password,
            message: this._languageService.getTransValue(
              'validation.passwordNotMatching'
            ),
          },
        },
        expressionProperties: {
          'props.disabled': (model) => !this.formly.get('password')?.valid,
        },
      },
    ]
  }
  override onSubmit(): void {
    // console.log(this.userInfo);
    // if (this.formly.invalid) {
    //   this.formly.markAllAsTouched();
    //   return;
    // }
    // let body:User = {
    //   Email:this.formlyModel.email,
    //   Password:this.formlyModel.password
    // }
    // this.isLoading =true
    // this._apiService.put(API_Config.profile.update,body).pipe(
    //   finalize(()=> this.isLoading =false),
    //   this.takeUntilDestroy()
    // ).subscribe({
    //   next:(res:ApiRes)=>{
    //     if (res && !res.error) {
    //       const text = this._languageService.getTransValue('messages.updateSuccessfully');
    //       this._toastrNotifiService.displaySuccess(text);
          this.onEdit.emit(true)
    //     }
    //   }
    // })
  }

}
