import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { StorageService } from '@core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent extends FormBaseClass implements OnInit {
  apiURL = API_Config.auth;
  _storageService = inject(StorageService)
  user = this._authService.getUser()
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
          required: true
        }
      },
    ]
  }


  onSubmit() {
    if (this.formly.valid) {
      this.isSubmit = true;
      this._apiService.get(`${this.apiURL.verifyOTP}?userId=${this.user.UserId}&verCode=${this.formlyModel.otp}`).pipe(
        finalize(() => this.isSubmit = false),
        this.takeUntilDestroy()
      ).subscribe({
        next: (res: any) => {
          if (res?.IsSucess) {
            this._toastrNotifiService.displaySuccessMessage(this._languageService.getTransValue('messages.signInSuccessfully'));
            this._router.navigate(['/dashboard'])
          }else{
            this._toastrNotifiService.displayErrorToastr(this._languageService.getTransValue('messages.invalidOTP'));
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
