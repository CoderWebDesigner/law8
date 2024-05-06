import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-verfiy-step-two',
  templateUrl: './verfiy-step-two.component.html',
  styleUrls: ['./verfiy-step-two.component.scss']
})
export class VerfiyStepTwoComponent extends FormBaseClass implements OnInit {
  @Output() onChange = new EventEmitter<number>()
  apiURL = API_Config.auth
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "otp",
        type: "otp",
        props: {
          class: 'text-center',
          length:5
        }
      },
    ]
  }


  onSubmit() {

    if (this.formly.valid) {
      this.isSubmit = true;
      this._apiService.post(this.apiURL.forgetPasswordValidateOtp,{
        ...this.formlyModel,
        ...this._authService.user
      }).pipe(
        finalize(() => this.isSubmit = false),
        this.takeUntilDestroy()
      ).subscribe({
        next: (res: ApiRes) => {
          if (res?.isSuccess) {
            this.onChange.emit(2)
          }else{
            this._toastrNotifiService.displayErrorToastr(this._languageService.getTransValue('messages.userIdOrEmailWrong'));
          }
        },
        error: err => {
          this._toastrNotifiService.displayErrorToastr(this._languageService.getTransValue('messages.signInError'));
        }
      })
    } else {
      return;
    }

  }


}
