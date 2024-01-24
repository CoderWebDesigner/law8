import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent extends FormBaseClass implements OnInit{
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formlyFields = [
      {
        key: "password",
        type: "password",
        props: {
          label: this._languageService.getTransValue("common.password"),
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
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }

}
