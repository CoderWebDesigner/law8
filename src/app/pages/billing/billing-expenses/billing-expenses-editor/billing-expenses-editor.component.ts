import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-billing-expenses-editor',
  standalone: true,
  imports: [CommonModule, FormlyConfigModule, SharedModule],
  templateUrl: './billing-expenses-editor.component.html',
  styleUrls: ['./billing-expenses-editor.component.scss'],
})
export class BillingExpensesEditorComponent
  extends FormBaseClass
  implements OnInit
{
  ngOnInit(): void {
    this.initForm();
  }

    // override initForm(): void {
    //   this.formlyFields = [
    //     {
    //       fieldGroupClassName: 'border-1',
    //       fieldGroup: [
    //         {
    //           fieldGroupClassName: 'card p-2 mb-2',
    //           fieldGroup: [
    //             {
    //               fieldGroupClassName: 'row mb-2 justify-content-between', 
    //               fieldGroup: [
    //                 {
    //                   key: 'matterNo',
    //                   type: 'select',
    //                   className: 'col-4', 
    //                   props: {
    //                     label: 'Matter',
    //                     required: true,
    //                     options: [
    //                       { label: '01652-001-01', value: '01652-001-01' }
    //                     ]
    //                   }
    //                 },
    //                 {
    //                   key: 'amount',
    //                   type: 'input',
    //                   className: 'col-4',
    //                   props: {
    //                     label: 'Amount',
    //                     addonRight: {
    //                       text: '$'
    //                     }
    //                   },
    //                   defaultValue: '150.00'
    //                 }
    //               ]
    //             },
              
    //             {
    //               fieldGroupClassName: 'row mb-2 justify-content-between', 
    //               fieldGroup: [
    //                 {
    //                   key: 'check',
    //                   type: 'input',
    //                   className: 'col-4',
    //                   props: {
    //                     label: 'Check/Receipt'
    //                   }
    //                 },
    //                 {
    //                   className: 'col-6 p-0', 
    //                   fieldGroupClassName: 'row m-0',
    //                   fieldGroup: [
    //                     {
    //                       key: 'type',
    //                       type: 'select',
    //                       className: 'col-6',
    //                       props: {
    //                         label: 'Type',
    //                         options: [
    //                           { label: 'Photo copying', value: 'Photo copying' }
    //                         ]
    //                       }
    //                     },
    //                     {
    //                       key: 'count',
    //                       type: 'input',
    //                       className: 'col-3',
    //                       props: {
    //                         label: 'Quantity',
    //                         type: 'number'
    //                       },
    //                       defaultValue: 10
    //                     },
    //                     {
    //                       key: 'price',
    //                       type: 'input',
    //                       className: 'col-3',
    //                       props: {
    //                         label: 'Price',
    //                         addonRight: {
    //                           text: '$'
    //                         }
    //                       },
    //                       defaultValue: '0.50'
    //                     }
    //                   ]
    //                 }
    //               ]
    //             }
    //           ]
    //         },
    //         {
    //           fieldGroup: [
    //             {
    //               fieldGroupClassName: 'row mb-3',
    //               fieldGroup: [
    //                 {
    //                   key: 'date',
    //                   type: 'date',
    //                   className: 'col-3',
    //                   props: {
    //                     label: 'Date'
    //                   },
    //                   defaultValue: '2024-12-10'
    //                 },
    //                 {
    //                   key: 'paidTo',
    //                   type: 'input',
    //                   className: 'col-6',
    //                   props: {
    //                     label: 'Paid to / Received from'
    //                   }
    //                 },
    //                 {
    //                   key: 'lawyer',
    //                   type: 'select',
    //                   className: 'col-3',
    //                   props: {
    //                     label: 'Lawyer'
    //                   }
    //                 }
    //               ]
    //             },
    //             {
    //               key: 'explanation',
    //               type: 'textarea',
    //               className: 'col-12 mb-3',
    //               props: {
    //                 label: 'Explanation',
    //                 rows: 3
    //               }
    //             },
    //             {
    //               fieldGroupClassName: 'row mb-3',
    //               fieldGroup: [
    //                 {
    //                   key: 'hold',
    //                   type: 'select',
    //                   className: 'col-4',
    //                   props: {
    //                     label: 'Hold',
    //                     options: [
    //                       { label: 'No Hold', value: 'No Hold' }
    //                     ]
    //                   }
    //                 },
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ];
    // }
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
                      key: 'matterNo',
                      type: 'select',
                      className: 'col-4', 
                      props: {
                        label: this._languageService.getTransValue('billing.matter'),
                        required: true,
                        options: [
                          { label: '01652-001-01', value: '01652-001-01' }
                        ]
                      }
                    },
                    {
                      key: 'amount',
                      type: 'input',
                      className: 'col-4',
                      props: {
                        label: this._languageService.getTransValue('billing.amount'),
                      },
                      defaultValue: '150.00'
                    }
                  ]
                },
                
                {
                  fieldGroupClassName: 'row mb-2 justify-content-between', 
                  fieldGroup: [
                    {
                      key: 'check',
                      type: 'input',
                      className: 'col-4',
                      props: {
                        label: this._languageService.getTransValue('billing.check')
                      }
                    },
                    {
                      className: 'col-6 p-0', 
                      fieldGroupClassName: 'row m-0',
                      fieldGroup: [
                        {
                          key: 'type',
                          type: 'select',
                          className: 'col-6',
                          props: {
                            label: this._languageService.getTransValue('billing.type'),
                            options: [
                              { label: 'Photo copying', value: 'Photo copying' }
                            ]
                          }
                        },
                        {
                          key: 'count',
                          type: 'input',
                          className: 'col-3',
                          props: {
                            label: this._languageService.getTransValue('billing.quantity'),
                            type: 'number'
                          },
                          defaultValue: 10
                        },
                        {
                          key: 'price',
                          type: 'input',
                          className: 'col-3',
                          props: {
                            label: this._languageService.getTransValue('billing.price'),
                          },
                          defaultValue: '0.50'
                        }
                      ]
                    }
                  ]
                }
              ]
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
                        label: this._languageService.getTransValue('billing.date')
                      },
                      defaultValue: '2024-12-10'
                    },
                    {
                      key: 'paidTo',
                      type: 'input',
                      className: 'col-6',
                      props: {
                        label: this._languageService.getTransValue('billing.paidTo')
                      }
                    },
                    {
                      key: 'lawyer',
                      type: 'select',
                      className: 'col-3',
                      props: {
                        label: this._languageService.getTransValue('billing.lawyer')
                      }
                    }
                  ]
                },
                {
                  key: 'explanation',
                  type: 'textarea',
                  className: 'col-12 mb-3',
                  props: {
                    label: this._languageService.getTransValue('billing.explanation'),
                    rows: 3
                  }
                },
                {
                  fieldGroupClassName: 'row mb-3',
                  fieldGroup: [
                    {
                      key: 'hold',
                      type: 'select',
                      className: 'col-4',
                      props: {
                        label: this._languageService.getTransValue('billing.hold'),
                        options: [
                          { label: this._languageService.getTransValue('billing.noHold'), value: 'No Hold' }
                        ]
                      }
                    },
                  ]
                }
              ]
            }
          ]
        }
      ];
  }
  

    override onSubmit(): void {
      throw new Error('Method not implemented.');
    }
  }

