import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-id-step-one',
  templateUrl: './user-id-step-one.component.html',
  styleUrls: ['./user-id-step-one.component.scss'],
})
export class UserIdStepOneComponent extends FormBaseClass implements OnInit {
  @Output() onChange = new EventEmitter<number>();
  apiURL = API_Config.auth;
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: 'email',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('common.email'),
          placeholder: this._languageService.getTransValue(
            'auth.emailPlaceholder'
          ),
          icon: 'pi pi-envelope',
          required: true,
        },
        validators: { validation: ['email'] },
      },
    ];
  }

  onSubmit() {
    if(this.formly.invalid)  return
    this.isSubmit = true;
    this._apiService
      .post(
        this.apiURL.forgetPasswordSendOtp,
        this.formlyModel
      )
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this._sharedService.takeUntilDistroy()
      )
      .subscribe({
        next: (res: ApiRes) => {

          if (res?.isSuccess) {
            this._authService.user={email:this.formlyModel.email}
            this.onChange.emit(1);
          } else {
            this._toastrNotifiService.displayErrorToastr(
              this._languageService.getTransValue('messages.userIdOrEmailWrong')
            );
          }
        },
        error: (err) => {
          this._toastrNotifiService.displayErrorToastr(
            this._languageService.getTransValue('messages.signInError')
          );
        },
      });
  }
}
