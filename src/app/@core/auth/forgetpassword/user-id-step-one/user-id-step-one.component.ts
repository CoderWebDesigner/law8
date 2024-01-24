import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-id-step-one',
  templateUrl: './user-id-step-one.component.html',
  styleUrls: ['./user-id-step-one.component.scss']
})
export class UserIdStepOneComponent extends FormBaseClass implements OnInit {
  @Output() onChange = new EventEmitter<number>()
  apiURL = API_Config.auth
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "userId",
        type: "input",
        props: {
          label: this._languageService.getTransValue("auth.userId"),
          placeholder: this._languageService.getTransValue("auth.userIdPlaceholder"),
          icon: "pi pi-user",
          required:true
        }
      },
      {
        key: "email",
        type: "input",
        props: {
          label: this._languageService.getTransValue("common.email"),
          placeholder: this._languageService.getTransValue("auth.emailPlaceholder"),
          icon: "pi pi-envelope",
          required:true,
        },
        validators: {validation: ['email']}
      },
    ]
  }


  onSubmit() {

    if (this.formly.valid) {
      this.isSubmit = true;
      this._apiService.get(`${this.apiURL.getVerificationCode}?email=${this.formlyModel.email}&userId=${this.formlyModel.userId}`).pipe(
        finalize(() => this.isSubmit = false),
        this.takeUntilDestroy()
      ).subscribe({
        next: (res: any) => {
          if (res?.IsSucess) {
            this.onChange.emit(1)
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
