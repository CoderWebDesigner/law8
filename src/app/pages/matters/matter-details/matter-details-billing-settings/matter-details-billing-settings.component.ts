import { Component, Input, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-matter-details-billing-settings',
  templateUrl: './matter-details-billing-settings.component.html',
  styleUrls: ['./matter-details-billing-settings.component.scss']
})
export class MatterDetailsBillingSettingsComponent extends FormBaseClass implements OnInit {
  @Input() data: any[] = [];

  @Input() previewOnly: boolean;

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
              disabled: this.previewOnly,
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
              disabled: this.previewOnly,
            }
          },
          {
            type: 'input',
            key: 'emailTemplate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.emailTemplate'),
              disabled: this.previewOnly,
            }
          },
          // {
          //   type: 'select',
          //   key: 'branch',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.branch'),
          //     disabled: this.previewOnly,
          //     options: [
          //       { label: 'Option 1', value: 'Option 1' },
          //       { label: 'Option 2', value: 'Option 2' },
          //       { label: 'Option 3', value: 'Option 3' },
          //       { label: 'Option 4', value: 'Option 4' },
          //     ]
          //   }
          // },
          {
            type: 'input',
            key: 'claimAmount',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.claimAmount'),
              disabled: this.previewOnly,
              type:'number'
            }
          },
          // {
          //   type: 'textarea',
          //   key: 'notes',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.notes'),
          //     disabled: this.previewOnly,
          //     type:'number'
          //   }
          // },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue("matters.fees")}</span></h5>`,
          },
          {
            type: 'checkbox',
            key: 'useTaskBasedBilling',
            className: 'col-lg-2 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.useTaskBasedBilling'),
              disabled: this.previewOnly,
            }
          },
               {
            type: 'select',
            key: 'branch',
            className: 'col-lg-3 col-md-4',
            props: {
              // label: this._languageService.getTransValue('matters.branch'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'checkbox',
            key: 'applyDiscountFees',
            className: 'col-lg-2 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.applyDiscountFees'),
              disabled: this.previewOnly,
            }
          },
          {
            type: 'input',
            key: 'discount',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.discount'),
              disabled: this.previewOnly,
              type:'number',
              min:0
            }
          },
          {
            type: 'select',
            key: 'quoteType',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.quoteType'),
              disabled: this.previewOnly,
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
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.amount'),
              type:'number',
              min:0,
              disabled: this.previewOnly,
            }
          },
          {
            type: 'select',
            key: 'branch',
            className: 'col-lg-6 col-md-4',
            props: {
            label: this._languageService.getTransValue('Every Bill'),
              disabled: this.previewOnly,
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
            key: 'nobill',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('no of bill'),
              type:'number',
              min:0,
              disabled: this.previewOnly,
            }
          },
          {
            type: 'input',
            key: 'maximumFee',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.maximumFee'),
              type:'number',
              min:0,
              disabled: this.previewOnly,
            }
          },
          {
            type: 'input',
            key: 'maximumFee',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('Bills of So far'),
              type:'number',
              min:0,
              disabled: this.previewOnly,
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
              disabled: this.previewOnly,
            }
          },
          {
            type:'select',
            key:'disability',
            className:'col-lg-3 col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.disability'),
              disabled: this.previewOnly,
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
              disabled: this.previewOnly,
              type:'number',
              min:0
            }
          },
            {
            type: 'textarea',
            key: 'notes',
            className: 'col-lg-12 col-md-4',
            props: {
              label: this._languageService.getTransValue('Explanations'),
              disabled: this.previewOnly,
              type:'number'
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
