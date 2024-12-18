import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { catchError, combineLatest, finalize, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent extends FormBaseClass implements OnInit {
  
  ngOnInit(): void {
    this.initForm();
    this.getLookupsData();
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        key: 'info',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'law_MatterId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.title'),
              options: this.lookupsData[0]?.result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              onChange: (e) => {
                const params = {
                  MatterId: e.value,
                };
                this._apiService
                  .get(`${API_Config.billDetailsById.get}`, params)
                  .pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res: ApiRes) => {
                      this.formly.get('info').patchValue(res.result);
                      this.formly.get('summary').patchValue(res.result);
                    },
                  });
              },
            },
          },
          {
            key: 'clientName',
            className: 'col-md-4',
            type: 'input',
            props: {
              label: 'Client Name',
              disabled: true,
            },
          },
          // {
          //   key: 'invoiceNumber',
          //   className: 'col-md-4',
          //   type: 'input',
          //   props: {
          //     label: 'Invoice Number',
          //     pKeyFilter: 'int',
          //     iconClassStyle: 'p-input-icon-right',
          //     icon: this.loading ? 'pi pi-spin pi-spinner' : '',
          //     onKeyUp: (e) => {
          //       if (e) {
          //         // this.loading = true;
          //         let params = {
          //           InvoiceNumber: e
          //         };
          //         this._apiService.get(API_Config.billInvoiceNumberCheck.get, params).pipe(
          //           this._sharedService.takeUntilDistroy(),
          //           finalize(() => this.loading = false)
          //         ).subscribe({
          //           next: (res: ApiRes) => {
          //             this._toastrNotifiService.displaySuccessMessage(res.result);
          //           }
          //         });
          //       }
          //     }
          //   },
          // },
          {
            key: 'invoiceNumber',
            className: 'col-md-4',
            type: 'input',
            props: {
              label: 'Invoice Number',
              pKeyFilter: 'int',
              iconClassStyle: 'p-input-icon-right',
              // icon:'pi pi-spin pi-spinner',
              onKeyUp: (e) => {
                if (e) {
                  // this.loading=true
                  let params = {
                    InvoiceNumber: e,
                  };
                  this._apiService
                    .get(API_Config.billInvoiceNumberCheck.get, params)
                    .pipe(
                      this._sharedService.takeUntilDistroy()
                      // finalize(()=>this.loading=false)
                    )
                    .subscribe({
                      next: (res: ApiRes) => {
                        if (!res.result.isValid) {
                          this._toastrNotifiService.displayErrorToastr(
                            res.result.message
                          );
                        }
                      },
                    });
                }
              },
            },
          },
          {
            key: 'templetId',
            className: 'col-md-4',
            type: 'select',
            props: {
              label: 'Template',
              options: this.lookupsData[1]?.result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            key: 'date',
            className: 'col-md-4',
            type: 'date',
            props: {
              label: 'A/R Date',
            },
          },
        ],
      },

      {
        fieldGroupClassName: 'row',
        key: 'time',
        fieldGroup: [
          {
            type: 'date',
            key: 'FromDate',
            className: 'col-md-3',
            props: {
              label: 'Bill From',
            },
            hooks: {
              onInit: () => {
                this.formly
                  .get('time.FromDate')
                  .valueChanges.pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res: any) => {
                      this.formly
                        .get('expenses.startDate')
                        .setValue(new Date(res));
                    },
                  });
              },
            },
          },
          {
            type: 'date',
            key: 'ToDate',
            className: 'col-md-3',
            props: {
              label: 'Bill To',
            },
            hooks: {
              onInit: () => {
                this.formly
                  .get('time.ToDate')
                  .valueChanges.pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res: any) => {
                      this.formly
                        .get('expenses.endDate')
                        .setValue(new Date(res));
                    },
                  });
              },
            },
          },
          {
            type: 'checkbox',
            key: 'NeverBill',
            className: 'col-md-3 d-flex align-items-center',
            props: {
              label: 'Never Bill Entries',
              options: [{ label: 'exclude', value: 'exclude' }],
            },
          },
          {
            type: 'checkbox',
            key: 'IncludeHold',
            className: 'col-md-3 d-flex align-items-center',
            props: {
              label: 'Include Held Entries',
            },
          },
          {
            key: 'feesData',
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        key: 'expenses',
        fieldGroup: [
          {
            type: 'date',
            key: 'FromDate',
            className: 'col-md-3',
            defaultValue: this.formlyModel?.time?.billFrom,
            props: {
              label: 'Start Date',
            },
          },
          {
            type: 'date',
            key: 'ToDate',
            className: 'col-md-3',
            props: {
              label: 'End Date',
            },
          },
          {
            type: 'checkbox',
            key: 'NeverBill',
            className: 'col-md-3 d-flex align-items-center',
            props: {
              label: 'Never Bill Entries',
            },
          },
          {
            type: 'checkbox',
            key: 'IncludeHold',
            className: 'col-md-3 d-flex align-items-center',
            props: {
              label: 'Include Held Changes',
            },
          },
          {
            key: 'expensesData',
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        key: 'summary',
        fieldGroup: [
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'Summary'
            )}</span></h5>`,
          },
          {
            className: 'col-md-3',
            template: `<span class="fw-bold">${this._languageService.getTransValue(
              'Total Fees'
            )}</span>`,
          },
          {
            key: 'totalFees',
            className: 'col-md-3',
            defaultValue: 0,
            type: 'input',
            props: {
              readonly: true,
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                this.formly
                  .get('time.feesData')
                  ?.valueChanges.pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res: any) => {
                      if (res.length > 0) {
                        const taxesFees =
                          this.formly.get('summary.totalFees')?.value *
                          (this.formly.get('summary.taxesFees')?.value / 100);
                        this.formly.get('summary.taxes').setValue(taxesFees);
                      }
                    },
                  });
              },
            },
          },
          {
            className: 'col-md-3',
            template: `<span class="fw-bold">${this._languageService.getTransValue(
              'Previous Balance'
            )}</span>`,
          },
          {
            key: 'previousBalance',
            className: 'col-md-3',
            defaultValue: 0,
            type: 'input',
            props: {
              readonly: true,
            },
          },
          {
            className: 'col-md-3',
            fieldGroupClassName: 'd-flex',
            fieldGroup: [
              {
                template: `<span class="fw-bold">${this._languageService.getTransValue(
                  'Taxes'
                )} 
                 </span>`,
              },
              {
                key: 'taxesFees',
                type: 'input',
                defaultValue: 0,
                className: 'hide-input mx-2',
                props: {
                  readonly: true,
                },
                expressions: {
                  'props.label': `'( '+ model.taxesFees + '%' +' )' `,
                },
              },
            ],
          },

          {
            key: 'taxes',
            className: 'col-md-3',
            defaultValue: 0,
            type: 'input',
            props: {
              readonly: true,
            },
          },
          {
            className: 'col-md-3',
            template: `<span class="fw-bold">${this._languageService.getTransValue(
              'Trust Bank Account'
            )}</span>`,
          },
          {
            key: 'trustBankAccount',
            className: 'col-md-3',
            defaultValue: 0,
            type: 'input',
            props: {
              readonly: true,
            },
          },
          {
            className: 'col-md-3',
            template: `<span class="fw-bold">${this._languageService.getTransValue(
              'Total Expenses'
            )}</span>`,
          },
          {
            key: 'totalExpenses',
            className: 'col-md-3',
            defaultValue: 0,
            type: 'input',
            props: {
              readonly: true,
            },
            hooks: {
              onInit: () => {
                this.formly
                  .get('expenses.expensesData')
                  ?.valueChanges.pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res: any) => {
                      if (res.length > 0) {
                        const expensesFees =
                          this.formly.get('summary.totalExpenses')?.value *
                          (this.formly.get('summary.taxesExpenses')?.value /
                            100);
                        this.formly.get('summary.taxe').setValue(expensesFees);
                      }
                    },
                  });
              },
            },
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              // {
              //   className: 'col-md-3',
              //   template: `<span class="fw-bold">${this._languageService.getTransValue(
              //     'Taxes Expenses'
              //   )}</span>`,
              // },
              // {key:'taxesExpenses'},
              {
                className: 'col-md-3',
                fieldGroupClassName: 'd-flex',
                fieldGroup: [
                  {
                    template: `<span class="fw-bold">${this._languageService.getTransValue(
                      'Taxes Expenses'
                    )} 
                     </span>`,
                  },
                  {
                    key: 'taxesExpenses',
                    type: 'input',
                    defaultValue: 0,
                    className: 'hide-input mx-2',
                    props: {
                      readonly: true,
                    },
                    expressions: {
                      'props.label': `'( '+ model.taxesExpenses + '%' +' )' `,
                    },
                  },
                ],
              },
              {
                key: 'taxe',
                className: 'col-md-3',
                defaultValue: 0,
                type: 'input',
                props: {
                  readonly: true,
                },
              },
              {
                className: 'col-md-6',
                fieldGroupClassName: 'row bg-secondary-subtle',
                fieldGroup: [
                  {
                    className: 'col-6',
                    template: `<span class="fw-bold d-inline-block py-3">${this._languageService.getTransValue(
                      'Grand Total'
                    )}</span>`,
                  },
                  {
                    key: 'grandTotal',
                    className: 'col-6',
                    defaultValue: 0,
                    type: 'input',
                    props: {
                      readonly: true,
                    },
                    hooks: {
                      onInit: () => {
                        combineLatest({
                          expenses: this.formly.get('expenses.expensesData')
                            .valueChanges,
                          fees: this.formly.get('time.feesData').valueChanges,
                        })
                          .pipe(this._sharedService.takeUntilDistroy())
                          .subscribe({
                            next: (res: any) => {
                              console.log('grandTotal', res);
                              const totalExpensesFees =
                                +this.formly.get('summary.taxe')?.value || 0;
                              const totalFees =
                                +this.formly.get('summary.totalFees')?.value ||
                                0;
                              const totalTaxesFees =
                                +this.formly.get('summary.taxes')?.value || 0;
                              const totalExpenses =
                                +this.formly.get('summary.totalExpenses')
                                  ?.value || 0;
                              const grandTotal =
                                totalExpensesFees +
                                totalFees +
                                totalTaxesFees +
                                totalExpenses;
                              this.formly
                                .get('summary.grandTotal')
                                .setValue(grandTotal);
                            },
                          });
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }

  override getLookupsData(): void {
    forkJoin([
      this._apiService.get(API_Config.general.getAllMatter),
      this._apiService.get(API_Config.general.getBillingTempletsList),
    ])
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          this.lookupsData = res;
          this.initForm();
        },
      });
  }

  getFields(keyName: string) {
    return this.formlyFields.filter((fields) => fields.key == keyName);
  }
  override onSubmit(): void {
    console.log(this.formlyModel);
    if (this.formly.invalid) return;
    const model = {
      law_MatterId: this.formlyModel.info.law_MatterId?.toString(),
      invoiceNumber: this.formlyModel.info.invoiceNumber,
      templetId: this.formlyModel.info.templetId,
      date: this.formlyModel.info.date,
      totalFees: this.formlyModel.summary.totalFees,
      taxes: this.formlyModel.summary.taxes,
      totalExpenses: this.formlyModel.summary.totalExpenses,
      taxe: this.formlyModel.summary.taxe,
      grandTotal: this.formlyModel.summary.grandTotal,
      billingExpenses: this.formlyModel.expenses.expensesData.map((obj) => ({
        id: obj.id,
      })),
      billingTimeFees: this.formlyModel.time.feesData.map((obj) => ({
        id: obj.id,
      })),
    };
    this.isLoading = true;
    this._apiService
      .post(API_Config.bill.create, model)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res: ApiRes) => {},
      });
  }
}
