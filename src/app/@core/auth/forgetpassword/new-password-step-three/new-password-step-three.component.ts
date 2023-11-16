import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-new-password-step-three',
  templateUrl: './new-password-step-three.component.html',
  styleUrls: ['./new-password-step-three.component.scss']
})
export class NewPasswordStepThreeComponent extends FormBaseClass implements OnInit {

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "password",
        type: "password",
        props: {
          label: this._languageService.getTransValue("auth.password"),
          required:true
        }
      },
      {
        key: "confirmPassword",
        type: "password",
        props: {
          label: this._languageService.getTransValue("auth.confirmPassword"),
          required:true,
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
