import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { AuthService, StorageService } from '@core/services';
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
        key: "otpCode",
        type: "otp",
        props: {
          class: 'text-center',
          required: true
        }
      },
    ]
  }


  onSubmit() {
    if (this.formly.invalid) return
    this.isSubmit = true;
    const formValue = {...this.formly.value,employeeId:this._storageService.getStorage('empolyeeId')}
    this._apiService.post(this.apiURL.verifyOTP,formValue).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: (res: ApiRes) => {
        if(res && res.Success){
          this._storageService.setStorage('token', res.Data['token']);
          this._storageService.setStorage('empolyeeId', res.Data['employeeId']);
          this._toastrNotifiService.displaySuccessMessage(this._languageService.getTransValue('messages.signInSuccessfully'));
          this._router.navigate(['/dashboard'])
        }
        // } else {
        //   this._toastrNotifiService.displayErrorToastr(this._languageService.getTransValue('messages.invalidOTP'));
        // }
      }
    })


  }
}
