import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent extends FormBaseClass implements OnInit{
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
    this.isSubmit = true;
    if (this.formly.invalid) {
      this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
      return;
    }
    this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
    this._router.navigate(['/auth/otp'])
    // if (this.checkRole()) {
    //   this.isSubmit = false
    //   this._storageService.setStorage('token', "token");
    //   this._storageService.setStorage('role', this.role);
    //   this._router.navigate(['/'])
    // }

  }
}
