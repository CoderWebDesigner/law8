import { Component, Input, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-matter-details-billing-settings',
  templateUrl: './matter-details-billing-settings.component.html',
  styleUrls: ['./matter-details-billing-settings.component.scss']
})
export class MatterDetailsBillingSettingsComponent extends FormBaseClass implements OnInit {

  @Input() showFields: boolean = true
  ngOnInit(): void {
    this.initForm()
  }

  override initForm(): void {
    // Frequency


// Billing Template

// Email Template

// Branch
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            type: 'select',
            key: 'frequency',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.frequency'),

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
            key: 'billingTemplate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.billingTemplate'),

            }
          },
          {
            type: 'input',
            key: 'emailTemplate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.emailTemplate'),

            }
          },
          {
            type: 'select',
            key: 'branch',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.branch'),

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
            key: 'claimAmount',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.claimAmount'),

              type:'number'
            }
          },
          {
            type: 'textarea',
            key: 'notes',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.notes'),

              type:'number'
            }
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue("matters.fees")}</span></h5>`,
          },
          {
            type: 'checkbox',
            key: 'useTaskBasedBilling',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.useTaskBasedBilling'),
            }
          },
          {
            type: 'checkbox',
            key: 'applyDiscountFees',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.applyDiscountFees'),
            }
          },
          {
            type: 'input',
            key: 'discount',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.discount'),
              type:'number',
              min:0
            }
          },
          {
            type: 'select',
            key: 'quoteType',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.quoteType'),

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
            key: 'amount',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.amount'),
              type:'number',
              min:0
            }
          },
          {
            type: 'input',
            key: 'maximumFee',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.maximumFee'),
              type:'number',
              min:0
            }
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue("matters.disbursment")}</span></h5>`,
          },
          {
            type:'checkbox',
            key:'automaticallyCreateDisability',
            className:'col-lg-3 col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.automaticallyCreateDisability'),
            }
          },
          {
            type:'select',
            key:'disability',
            className:'col-lg-3 col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.disability'),
              options:[
                {label:'Option 1', value:'Option 1'},
                {label:'Option 2', value:'Option 2'},
                {label:'Option 3', value:'Option 3'},
              ]
            }
          },
          {
            type:'input',
            key:'amountAndPrecentage',
            className:'col-lg-3 col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.amountAndPrecentage'),
              type:'number',
              min:0
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
