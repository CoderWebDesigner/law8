import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-user-id-step-one',
  templateUrl: './user-id-step-one.component.html',
  styleUrls: ['./user-id-step-one.component.scss']
})
export class UserIdStepOneComponent extends FormBaseClass implements OnInit {
  @Output() onChange = new EventEmitter<number>()
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
          label: this._languageService.getTransValue("auth.email"),
          placeholder: this._languageService.getTransValue("auth.emailPlaceholder"),
          icon: "pi pi-envelope",
          required:true,
        },
        validators: {validation: ['email']}
      },
    ]
  }


  onSubmit() {
    this.onChange.emit(1)
    // this.isSubmit = true;
    // if (this.formly.invalid) {
    //   this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
    //   return;
    // }
    // this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
    // this._router.navigate(['/auth/otp'])
    // // if (this.checkRole()) {
    // //   this.isSubmit = false
    // //   this._storageService.setStorage('token', "token");
    // //   this._storageService.setStorage('role', this.role);
    // //   this._router.navigate(['/'])
    // // }

  }

}
