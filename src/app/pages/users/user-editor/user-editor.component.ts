import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent extends FormBaseClass implements OnInit {
  userId:number;
  ngOnInit(): void {
    this.initForm();
    this.userId=+this._route.snapshot.paramMap.get('id');
    console.log(this.userId)
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'input',
            key: 'userName',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.username'),
              required: true
            }
          },
          {
            type: 'input',
            key: 'portalId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.portalId'),
              required: true
            }
          },
          {
            type: 'phone',
            key: 'mobile',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.mobileNumber'),
              required: true
            }
          },
          {
            type: 'input',
            key: 'telephone',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.telephone'),
              required: true
            }
          },
          {
            type: 'input',
            key: 'telephone',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.telephone'),
              required: true
            },
            validators: {
              validation: ['email'],
            }
          },
          {
            type: 'password',
            key: 'password',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.password'),
              required: true
            }
          },
          {
            type: 'date',
            key: 'timesheetDate',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.timesheetDate'),
              required: true
            }
          },
        ]
      }
    ]
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
}
