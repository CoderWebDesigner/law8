import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { StorageService } from '@core/services';
import { PermissionService } from '@core/services/permission.service';
import { jwtDecode } from 'jwt-decode';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent extends FormBaseClass implements OnInit {
  apiURL = API_Config.auth;
  _storageService = inject(StorageService);
  _permissionService=inject(PermissionService)
  counterInSeconds: number = 300;
  interval: any;
  user=this._authService.user
  ngOnInit() {
    if (!this.user?.userName) this._router.navigate(['/auth/login']);
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: 'otp',
        type: 'otp',
        props: {
          class: 'text-center',
          required: true,
          length: 5,
        },
      },
      {
        key: 'userName',
        defaultValue: this.user?.userName,
      },
    ];
    this.countDown();
  }

  countDown() {
    this.interval = setInterval(() => {
      this.counterInSeconds--;
      if (this.counterInSeconds == 0) {
        this._router.navigate(['/auth/login']);
        clearInterval(this.interval);
      }
    }, 1000);
  }
  onSubmit() {
    if (this.formly.valid) {
      this.isSubmit = true;
      this._apiService
        .post(this.apiURL.verifyOTP, this.formlyModel)
        .pipe(
          finalize(() => (this.isSubmit = false)),
          this._sharedService.takeUntilDistroy()
        )
        .subscribe({
          next: (res: ApiRes) => {
            if (res?.isSuccess) {
              clearInterval(this.interval);
              this._storageService.setStorage('token', res.result);
              this._toastrNotifiService.displaySuccessMessage(
                this._languageService.getTransValue(
                  'messages.signInSuccessfully'
                )
              );
              // this._authService.user.permissions=jwtDecode(res.result)['role']
              this._permissionService.userPermissions=this._authService.getDecodedToken()['role']
              this._router.navigate(['/dashboard']);
              setTimeout(() => {
                window.location.reload()
              }, 300);

            } else {
              this._toastrNotifiService.displayErrorToastr(
                this._languageService.getTransValue('messages.invalidOTP')
              );
            }
          },
          error: (err) => {
            this._toastrNotifiService.displayErrorToastr(
              this._languageService.getTransValue('messages.signInError')
            );
          },
        });
    } else {
      return;
    }
  }


}
