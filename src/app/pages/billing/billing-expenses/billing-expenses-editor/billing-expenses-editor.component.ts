import { Component, inject, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-billing-expenses-editor',
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
  templateUrl: './billing-expenses-editor.component.html',
  styleUrls: ['./billing-expenses-editor.component.scss'],
})
export class BillingExpensesEditorComponent
  extends FormBaseClass
  implements OnInit
{
  id: any;
  ngOnInit(): void {
    this.getLookupsData();
    this.id = this._dynamicDialogConfig?.data?.rowData?.id;
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'border-1',
        fieldGroup: [
          {
            fieldGroupClassName: 'card p-2 mb-2',
            fieldGroup: [
              {
                fieldGroupClassName: 'row mb-2 justify-content-between',
                fieldGroup: [
                  {
                    key: 'matterId',
                    type: 'select',
                    className: 'col-4',
                    props: {
                      label:
                        this._languageService.getTransValue('billing.matter'),
                      required: true,
                      options: this.lookupsData.matters.result.map((obj) => ({
                        label: obj.name,
                        value: obj.id,
                      })),
                      onChange: (e) => {
                        this.formly
                          .get('matter')
                          .setValue(e?.originalEvent.target.innerText);
                      },
                    },
                  },
                  {
                    key: 'matter',
                  },
                  {
                    key: 'amount',
                    type: 'input',
                    className: 'col-4',
                    props: {
                      label:
                        this._languageService.getTransValue('billing.amount'),
                      pKeyFilter: 'int',
                    },
                  },
                ],
              },

              {
                fieldGroupClassName: 'row mb-2 justify-content-between',
                fieldGroup: [
                  {
                    key: 'check_Receipt',
                    type: 'input',
                    className: 'col-4',
                    props: {
                      label:
                        this._languageService.getTransValue('billing.check'),
                    },
                  },
                  {
                    className: 'col-6 p-0',
                    fieldGroupClassName: 'row m-0',
                    fieldGroup: [
                      {
                        key: 'typeId',
                        type: 'select',
                        className: 'col-6',
                        props: {
                          label:
                            this._languageService.getTransValue('billing.type'),
                          // options: [{ label: 'Photo copying', value: 1 }],
                          options: this.lookupsData.types.result.map((obj) => ({
                            label: obj.name,
                            value: obj.id,
                          })),
                          onChange: (e) => {
                            this.formly
                              .get('type')
                              .setValue(e?.originalEvent.target.innerText);
                          },
                        },
                      },
                      {
                        key: 'type',
                      },
                      {
                        key: 'quantity',
                        type: 'input',
                        className: 'col-3',
                        props: {
                          label:
                            this._languageService.getTransValue(
                              'billing.quantity'
                            ),
                          pKeyFilter: 'int',
                          keyup: () => {
                            this.calcAmount();
                          },
                        },
                      },
                      {
                        key: 'price',
                        type: 'input',
                        className: 'col-3',
                        props: {
                          label:
                            this._languageService.getTransValue(
                              'billing.price'
                            ),
                          pKeyFilter: 'int',
                          keyup: () => {
                            this.calcAmount();
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            fieldGroup: [
              {
                fieldGroupClassName: 'row mb-3',
                fieldGroup: [
                  {
                    key: 'date',
                    type: 'date',
                    className: 'col-3',
                    props: {
                      label:
                        this._languageService.getTransValue('billing.date'),
                    },
                    defaultValue: '2024-12-10',
                  },
                  {
                    key: 'paidToReceivedFrom',
                    type: 'input',
                    className: 'col-6',
                    props: {
                      label:
                        this._languageService.getTransValue('billing.paidTo'),
                    },
                  },
                  {
                    key: 'lawyerId',
                    type: 'select',
                    className: 'col-3',
                    props: {
                      label:
                        this._languageService.getTransValue('billing.lawyer'),
                      options: this.lookupsData.lawyers.result.map((obj) => ({
                        label: obj.name,
                        value: obj.id,
                      })),
                      onChange: (e) => {
                        this.formly
                          .get('lawyer')
                          .setValue(e?.originalEvent.target.innerText);
                      },
                    },
                  },
                  {
                    key: 'lawyer',
                  },
                ],
              },
              {
                key: 'explanation',
                type: 'textarea',
                className: 'col-12 mb-3',
                props: {
                  label: this._languageService.getTransValue(
                    'billing.explanation'
                  ),
                  rows: 3,
                },
              },
              {
                fieldGroupClassName: 'row mb-3',
                fieldGroup: [
                  {
                    key: 'holdId',
                    type: 'select',
                    className: 'col-4',
                    props: {
                      label:
                        this._languageService.getTransValue('billing.hold'),
                      // options: [
                      //   {
                      //     label:
                      //       this._languageService.getTransValue(
                      //         'billing.noHold'
                      //       ),
                      //     value: 1,
                      //   },
                      // ],
                      options: this.lookupsData.holds.result.map((obj) => ({
                        label: obj.name,
                        value: obj.id,
                      })),
                      onChange: (e) => {
                        this.formly
                          .get('hold')
                          .setValue(e?.originalEvent.target.innerText);
                      },
                    },
                  },
                  {
                    key: 'hold',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }

  calcAmount() {
    const price = +this.formlyModel.price;
    const quantity = +this.formlyModel.quantity;
    if (price && quantity) {
      const amount = price * quantity;
      this.formly.get('amount').setValue(amount);
    }
  }
  override getLookupsData(): void {
    combineLatest({
      lawyers: this._apiService.get(API_Config.general.getLawyerShort),
      matters: this._apiService.get(API_Config.general.getAllMatter),
      holds: this._apiService.get(API_Config.general.getAllBillingHold),
      types: this._apiService.get(API_Config.general.getAllBillingType),
    })
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res) => {
          console.log(res);
          this.lookupsData = res;
          this.initForm();
        },
      });
  }
  override onSubmit(): void {
    if (this.formly.invalid) {
      this.formly.markAllAsTouched();
      return;
    }

    this.formlyModel.amount = this.formlyModel?.amount?.toString();
    const requestPayload = this.id
      ? {
          ...this.formlyModel,
          id: this.id,
        }
      : this.formlyModel;
    this._dynamicDialogRef.close(requestPayload);
  }
}
