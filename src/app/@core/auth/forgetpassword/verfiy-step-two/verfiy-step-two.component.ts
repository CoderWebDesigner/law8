import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
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
        }
      },
    ]
  }


  onSubmit() {

    if (this.formly.valid) {
      this.isSubmit = true;
      this._apiService.get(`${this.apiURL.verifyEmailCode}?email=${this.formlyModel.email}&verCode=${this.formlyModel.otp}`).pipe(
        finalize(() => this.isSubmit = false),
        this.takeUntilDestroy()
      ).subscribe({
        next: (res: any) => {
          if (res?.IsSucess) {
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
