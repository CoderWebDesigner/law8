import { Component, Input, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { MatterBillingRateExceptionComponent } from './matter-billing-rate-exception/matter-billing-rate-exception.component';
import { MatterBillingTaxesComponent } from './matter-billing-taxes/matter-billing-taxes.component';

@Component({
  selector: 'app-matter-billing',
  templateUrl: './matter-billing.component.html',
  styleUrls: ['./matter-billing.component.scss'],
})
export class MatterBillingComponent
  extends FormBaseClass
  implements OnInit
{
  @Input() data: any[] = [];

  @Input() previewOnly: boolean;
  @Input() requestId:number;
  ngOnInit(): void {
    this.initForm();
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
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
              ],
            },
          },
          {
            type: 'input',
            key: 'billingTemplate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.billingTemplate'
              ),
              disabled: this.previewOnly,
            },
          },
          {
            type: 'input',
            key: 'emailTemplate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.emailTemplate'
              ),
              disabled: this.previewOnly,
            },
          },
          {
            type: 'input',
            key: 'claimAmount',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.claimAmount'),
              disabled: this.previewOnly,
              type: 'number',
            },
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'matters.fees'
            )}</span></h5>`,
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                type: 'checkbox',
                key: 'useTaskBasedBilling',
                className: 'col-lg-2 col-md-4 d-flex align-items-center',
                props: {
                  label: null,
                  value: this._languageService.getTransValue(
                    'matters.useTaskBasedBilling'
                  ),
                  disabled: this.previewOnly,
                },
              },

              {
                type: 'select',
                key: 'branch',
                className: 'col-lg-4 col-md-4 mb-2',
                props: {
                  disabled: this.previewOnly,
                  label: this._languageService.getTransValue('TaskGroup'),
                  options: [
                    { label: 'Option 1', value: 'Option 1' },
                    { label: 'Option 2', value: 'Option 2' },
                    { label: 'Option 3', value: 'Option 3' },
                    { label: 'Option 4', value: 'Option 4' },
                  ],
                },
              },
              // {
              //   type: 'checkbox',
              //   key: 'applyDiscountFees',
              //   className: 'col-lg-2 col-md-4 d-flex align-items-center',
              //   props: {
              //     label: this._languageService.getTransValue('matters.applyDiscountFees'),
              //     disabled: this.previewOnly,
              //   }
              // },
              {
                type: 'checkbox',
                key: 'applyDiscountFees',
                className: 'col-lg-2 col-md-4 d-flex align-items-center',
                props: {
                  label: null,
                  value: this._languageService.getTransValue(
                    'matters.applyDiscountFees'
                  ),
                  disabled: this.previewOnly,
                },
              },
              {
                type: 'input',
                key: 'discount',
                className: 'col-lg-3 col-md-4',
                props: {
                  label:
                    this._languageService.getTransValue('matters.discount'),
                  disabled: this.previewOnly,
                  type: 'number',
                  min: 0,
                },
              },
            ],
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
              ],
            },
          },
          {
            type: 'input',
            key: 'amount',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.amount'),
              type: 'number',
              min: 0,
              disabled: this.previewOnly,
            },
          },
          {
            type: 'select',
            key: 'everyBill',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.everyBill'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ],
            },
          },
          {
            type: 'input',
            key: 'nobill',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.noofbill'),
              type: 'number',
              min: 0,
              disabled: this.previewOnly,
            },
          },
          {
            type: 'input',
            key: 'maximumFee',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.maximumFee'),
              type: 'number',
              min: 0,
              disabled: this.previewOnly,
            },
          },
          {
            type: 'input',
            key: 'maximumFee',
            className: 'col-lg-6 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.BillsofSofar'),
              type: 'number',
              min: 0,
              disabled: this.previewOnly,
            },
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'matters.disbursment'
            )}</span></h5>`,
          },
          // {
          //   type: 'checkbox',
          //   key: 'automaticallyCreateDisability',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.automaticallyCreateDisability'),
          //     disabled: this.previewOnly,
          //   }
          // },
          {
            type: 'checkbox',
            key: 'automaticallyCreateDisability',
            className: 'col-lg-3 col-md-4 d-flex align-items-center',
            props: {
              label: null,
              value: this._languageService.getTransValue(
                'matters.automaticallyCreateDisability'
              ),
              disabled: this.previewOnly,
            },
          },
          {
            type: 'select',
            key: 'disability',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.disability'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
              ],
            },
          },
          {
            type: 'input',
            key: 'amountAndPrecentage',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.amountAndPrecentage'
              ),
              disabled: this.previewOnly,
              type: 'number',
              min: 0,
            },
          },
          {
            type: 'textarea',
            key: 'notes',
            className: 'col-lg-12 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.Explanations'),
              disabled: this.previewOnly,
            },
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'Taxes'
            )}</span></h5>`,
          },
          {
            className:'col-md-6',
            key:'salesTaxOnDisbursements',
            type:'input',
            defaultValue:0,
            props:{
              label:this._languageService.getTransValue('matters.salesTaxOnDisbursements'),
              pKeyFilter:'int'
            }
          },
          {
            className:'col-md-6',
            key:'salesTaxOnFees',
            type:'input',
            defaultValue:0,
            props:{
              label:this._languageService.getTransValue('matters.salesTaxOnFees'),
              pKeyFilter:'int'
            }
          },
        ],
      },
    ];
  }

  openTaxesEditor() {
    this._DialogService.open(MatterBillingTaxesComponent,{
      width:'50vw'
    })
  }
  openRateExceptionsEditor() {
    this._DialogService.open(MatterBillingRateExceptionComponent,{
      width:'50vw'
    })
  }

  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
}
