import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-matter-details-general',
  templateUrl: './matter-details-general.component.html',
  styleUrls: ['./matter-details-general.component.scss']
})
export class MatterDetailsGeneralComponent extends FormBaseClass implements OnInit {

  @Input() showFields: boolean = true
  ngOnInit(): void {
    this.initForm()
    this.formlyModel = {
      "clientIntroducing": "Option 1",
      "matterIntroducingLawyer": "Option 1",
      "responsibleLaywer": "Option 1",
      "assignedLaywer": ["Option 1"],
      "defaultTask": "Option 1",
      "defaultRate": "Option 1",
      "referralType": "Option 1",
      "otherStaff": ["Option 1"]
    }
  }

  override initForm(): void {

    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            type: 'select',
            key: 'clientIntroducing',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.clientIntroducing'),
              readonly: true,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'select',
            key: 'matterIntroducingLawyer',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterIntroducingLawyer'),
              readonly: true,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'select',
            key: 'responsibleLaywer',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.responsibleLaywer'),
              readonly: true,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'multi-select',
            key: 'assignedLaywer',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.assignedLaywer'),
              readonly: true,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'input',
            key: 'defaultTask',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.defaultTask'),
              readonly: true,
            }
          },
          {
            type: 'input',
            key: 'defaultRate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.defaultRate'),
              readonly: true,
            }
          },
          {
            type: 'input',
            key: 'referralType',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.referralType'),
              readonly: true,
            }
          },
          {
            type: 'multi-select',
            key: 'otherStaff',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.otherStaff'),
              readonly: true,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
        ]
      }
    ]
  }
  override onSubmit(): void {

    console.log(this.formlyModel)
  }


}
